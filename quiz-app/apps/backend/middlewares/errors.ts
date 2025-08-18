import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging)
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    res.status(statusCode).json({ errors });
  }
  console.error(
    JSON.stringify({ message: err.message, stack: err.stack }, null, 2)
  );
  return res
    .status(500)
    .send({ errors: [{ message: "Something Went Wrong" }] });
};
