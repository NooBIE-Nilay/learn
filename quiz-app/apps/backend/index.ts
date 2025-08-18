import Express from "express";
import userRouter from "./routes/users";
import quizRouter from "./routes/quiz";
import { errorHandler } from "./middlewares/errors";

const app = Express();
app.use(Express.json());

const PORT = process.env.BACKEND_PORT || 8080;

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
