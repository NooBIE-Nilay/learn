import { client } from "@repo/db/client";
import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8081 });

server.on("connection", (socket) => {
  const username = Math.random().toString();
  const name = Math.random().toString();
  const password = Math.random().toString();
  const user = client.user.create({
    data: { username, password, name },
  });
  socket.send(
    `Hi ${name}, you are connected as ${username} and password ${password}`
  );
});
