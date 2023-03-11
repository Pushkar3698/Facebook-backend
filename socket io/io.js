let io;

module.exports = {
  init: (server, cors) => {
    io = require("socket.io")(server, cors);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket not initialized");
    }
    return io;
  },
};
