import { newQuizSchema } from "@repo/zod/schemas";
import { prisma } from "@repo/db/client";
import type { Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import { getAuth } from "@clerk/express";
import UnauthorizedError from "../errors/UnauthorizedError";
export const createQuiz = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) throw new UnauthorizedError();
  const data = newQuizSchema.safeParse(req.body);
  if (!data.success || data.error)
    throw new BadRequestError({
      context: { error: data.error },
      message: data.error.message,
    });
  const quizData = data.data;
  const { questions, ...quizCore } = quizData;
  const dbResp = await prisma.quiz.create({
    data: {
      ...quizCore,
      authorId: userId,
      questions:
        questions && questions.length > 0
          ? {
              create: questions,
            }
          : undefined,
    },
    include: { questions: true },
  });
  return res.status(201).json({ success: true, quiz: dbResp });
};
