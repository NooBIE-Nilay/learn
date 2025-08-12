import express from "express";
import { client } from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the HTTP server!");
});
app.post("/signup", async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const user = await client.user.create({
    data: {
      username,
      password,
      name,
    },
  });
  res.status(201).json(user);
});

app.listen(8080, () =>
  console.log("HTTP server running on http://localhost:8080")
);
