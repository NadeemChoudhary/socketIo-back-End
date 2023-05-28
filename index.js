const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
// Middle Wares
const cors = require("cors");
const app = express();

app.use(cors());
var server = http.createServer(app);
app.get("/", (req, res) => {
  res.send("working");
});

//  Socket Io

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// server-side
io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socket.on("joinRoom", (room) => console.log(room));
  socket.on("newMessage", ({ message, Room }) => {
    console.log(Room, message);
    io.emit("getLatestMessage", message);
  });
});

// Server
server.listen(4000, () => {
  console.log("Server Started 4000");
});
