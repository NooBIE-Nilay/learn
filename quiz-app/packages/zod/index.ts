import { z } from "zod";
export const QuestionTypeValues = [
  "MCQ",
  "MCQ_MULTIPLE",
  "SHORT",
  "LONG",
] as const;

export const questionSchema = z.object({
  type: z.enum(QuestionTypeValues),
  mandatory: z.boolean().default(false),
  question: z.string().min(1),
  options: z.array(z.string()),
  answer: z.string().optional(),
  score: z.number().nonnegative().default(1),
});
export const answerSchema = z.object({
  participantId: z.string().min(32),
  questionId: z.string().min(32),
  value: z.json(),
});
export const newQuizSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  maxScore: z.number(),
  questions: z.array(questionSchema),
});
export const submitQuizSchema = z.object({
  quizId: z.string().min(32),
  answers: z.array(answerSchema),
});
