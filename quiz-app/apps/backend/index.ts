import Express from "express";
const app = Express();

const PORT = process.env.BACKEND_PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
