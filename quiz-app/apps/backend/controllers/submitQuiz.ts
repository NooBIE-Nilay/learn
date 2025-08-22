import { getAuth } from "@clerk/express";
import UnauthorizedError from "../errors/UnauthorizedError";
import { submitQuizSchema } from "@repo/zod/schemas";
import type { Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import { prisma } from "@repo/db/client";

export const submitQuiz = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) throw new UnauthorizedError();
  const parsedData = submitQuizSchema.safeParse(req.body);
  if (parsedData && !parsedData.success)
    throw new BadRequestError({
      context: { ...parsedData.error },
      message: parsedData.error.message,
    });
  const { answers } = parsedData.data;
  const dbResp = await prisma.quiz.findUnique({
    where: { id: parsedData.data.quizId },
    include: { questions: { include: { answers: true } } },
  });
  if (!dbResp) throw new BadRequestError({ message: "Quiz not found" });
  let totalScore = 0;
  dbResp.questions.forEach((question) => {
    const userAnswer = answers.find(
      (ans) => ans.questionId === question.id
    )?.value;
    if (userAnswer && userAnswer === question.answer)
      totalScore += question.score;
  });
  const participant = await prisma.participant.create({
    data: { quizId: dbResp.id, userId, score: totalScore },
  });

  return res.json({
    success: true,
    score: totalScore,
    questionsSolved: dbResp.questions.length,
    participant,
    answers,
  });
};
