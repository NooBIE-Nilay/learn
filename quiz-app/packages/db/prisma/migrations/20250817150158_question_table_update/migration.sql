/*
  Warnings:

  - Added the required column `mode` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('MCQ', 'MCQ_MULTIPLE', 'SHORT', 'LONG');

-- AlterTable
ALTER TABLE "public"."Question" ADD COLUMN     "answer" TEXT,
ADD COLUMN     "mandatory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mode" "public"."QuestionType" NOT NULL,
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "score" INTEGER NOT NULL;
