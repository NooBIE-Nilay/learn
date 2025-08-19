import { Router } from "express";
import { createQuiz } from "../controllers/createQuiz";
import { getQuizzes, getQuizById } from "../controllers/getQuiz";

const router = Router();
router.post("/create", createQuiz);
router.get("/:quizId", getQuizById);
router.get("/", getQuizzes);

export default router;
