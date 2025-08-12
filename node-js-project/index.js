const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.json({ message: "Hello From Server" });
});

app.listen(8000, () => console.log("Server Started in port 8000"));
