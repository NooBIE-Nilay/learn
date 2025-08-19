import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";
import BadRequestError from "../errors/BadRequestError";
import { prisma } from "@repo/db/client";

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw new UnauthorizedError();
    const quizId = req.params.quizId;
    if (!quizId) throw new BadRequestError({ message: "quizId Missing" });
    const dbResp = await prisma.quiz.findFirst({
      where: { id: quizId, authorId: userId },
      include: { questions: true, participants: true },
    });
    return res.json({ success: true, quiz: dbResp });
  } catch (e) {
    throw new BadRequestError({ context: { e } });
  }
};
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw new UnauthorizedError();
    const dbResp = await prisma.quiz.findMany({
      where: { authorId: userId },
      include: { questions: true, participants: true },
    });
    return res.json({ success: true, quizzes: dbResp });
  } catch (e) {
    throw new BadRequestError({ context: { e } });
  }
};
