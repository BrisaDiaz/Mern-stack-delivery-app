let io;
let ioStorage = {};

const connectSocketIo = async (http) => {
  io = require("socket.io")(http, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.data.userId = socket.handshake?.auth?.userId;
    socket.data.userRole = socket.handshake?.auth?.userRole;

    ioStorage[socket.data.userId] = { socketId: socket.id };

    if (
      socket.data.userRole === "admin" ||
      socket.data.userRole === "moderator"
    ) {
      console.log("admin join room");
      socket.join("admins-room");
    }

    socket.on("disconnect", (socket) => {
      console.log("user disconnected");
    });
  });
};
module.exports = { connectSocketIo, io, ioStorage };
