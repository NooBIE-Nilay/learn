import { z } from "zod";
export const QuestionTypeValues = [
  "MCQ",
  "MCQ_MULTIPLE",
  "SHORT",
  "LONG",
] as const;

export const questionSchema = z.object({
  quizId: z.string(),
  type: z.enum(QuestionTypeValues),
  mandatory: z.boolean().default(false),
  question: z.string(),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
  score: z.number().nonnegative().default(1),
});
export const newQuizSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  maxScore: z.number(),
  questions: z.array(questionSchema),
});
