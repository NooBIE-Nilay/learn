import "dotenv/config";
import Express from "express";
import quizRouter from "./routes/quiz";
import webhooksRouter from "./webhooks";
import { errorHandler } from "./middlewares/errors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const app = Express();
app.use(Express.json());

const PORT = process.env.BACKEND_PORT || 8080;

app.use(clerkMiddleware());

app.use("/quiz", requireAuth(), quizRouter);
app.use("/webhook", webhooksRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
