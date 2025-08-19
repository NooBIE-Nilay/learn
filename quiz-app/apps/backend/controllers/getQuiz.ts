import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";
import BadRequestError from "../errors/BadRequestError";
import { prisma } from "@repo/db/client";
import { deflateSync } from "bun";
import { submitQuizSchema } from "@repo/zod/schemas";

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) throw new UnauthorizedError();
    const quizId = req.params.quizId;
    if (!quizId) throw new BadRequestError({ message: "quizId Missing" });
    const authorQuiz = await prisma.quiz.findFirst({
      where: { id: quizId },
      include: {
        questions: { include: { answers: true } },
        participants: true,
      },
    });
    if (!authorQuiz) return new BadRequestError();
    if (authorQuiz.authorId === userId) {
      return res.json({ success: true, quiz: authorQuiz, author: true });
    }
    const userQuiz = {
      id: authorQuiz.id,
      title: authorQuiz.title,
      description: authorQuiz.description,
      questions: authorQuiz.questions.map((question) => ({
        id: question.id,
        quizId: question.quizId,
        type: question.type,
        mandatory: question.mandatory,
        question: question.question,
        options: question.options,
        score: question.score,
      })),
    };
    return res.json({ success: true, quiz: userQuiz, author: false });
  } catch (e) {
    throw new BadRequestError({ context: { e } });
  }
};
export const getQuizzes = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) throw new UnauthorizedError();
  const dbResp = await prisma.quiz.findMany({
    where: { authorId: userId },
    include: { questions: true, participants: true },
  });
  return res.json({ success: true, quizzes: dbResp });
};

export const submitQuiz = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) throw new UnauthorizedError();
  const parsedData = submitQuizSchema.safeParse(req.body);
  if (!parsedData.success)
    throw new BadRequestError({
      context: { ...parsedData.error },
      message: parsedData.error.message,
    });
  const dbResp = await prisma.participant.create({
    data: {
      userId,
      ...parsedData.data,
      answers: {
        //TODO: Fix This
        create: parsedData.data.answers,
      },
    },
  });
};
