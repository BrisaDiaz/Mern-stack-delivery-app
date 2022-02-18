const { Server } = require("socket.io");
const EventEmitter = require("events").EventEmitter;
const emiter = new EventEmitter();
let ioStorage = {};
let io = {};

function connectIO(server) {
  io = new Server(server, {
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
    emiter.on("newOrder", (order) => {
      io.in("admins-room").emit("newOrder", order);
    });
    emiter.on("orderActualization", (userId, order) => {
      const orderClientSocket = ioStorage[userId]?.socketId;

      if (orderClientSocket) {
        io.to(orderClientSocket).emit("orderActualization", order);
      }
    });
  });
}
module.exports.orderEmitter = emiter;
module.exports.connectIO = connectIO;
