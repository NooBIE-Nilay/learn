import express from "express";
import { client } from "./client";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});
app.get("/user", async (req, res) => {
  const data = await client.user.findMany();
  res.json({ message: "Users", data });
});

app.post("/user", async (req, res) => {
  const data = req.body();
  const resp = await client.user.create({ data: { ...data } });
  res.json({ message: "Post Endpoint", resp });
});

app.listen(3000, () => console.log("Server Started in port 3000"));
