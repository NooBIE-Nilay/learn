import z from "zod";
import { QuestionType } from "../db/generated/prisma";
const QuestionTypeArray = Object.values(QuestionType);
export const questionSchema = z.object({
  quizId: z.string(),
  type: z.enum(QuestionTypeArray),
  mandatory: z.boolean().default(false),
  question: z.string(),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
  score: z.number().default(1),
});
export const newQuizSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  maxScore: z.number(),
  questions: z.array(questionSchema),
});
