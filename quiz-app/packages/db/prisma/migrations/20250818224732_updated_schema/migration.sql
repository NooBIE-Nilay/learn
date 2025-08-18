/*
  Warnings:

  - You are about to drop the column `mode` on the `Question` table. All the data in the column will be lost.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Question" DROP COLUMN "mode",
ADD COLUMN     "type" "public"."QuestionType" NOT NULL;
