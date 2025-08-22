import { Router } from "express";
import { createQuiz } from "../controllers/createQuiz";
import { getQuizzes, getQuizById } from "../controllers/getQuiz";
import { submitQuiz } from "../controllers/submitQuiz";

const router = Router();
router.post("/create", createQuiz);
router.post("/submit", submitQuiz);
router.get("/:quizId", getQuizById);
router.get("/getAllQuizzes", getQuizzes);

export default router;
