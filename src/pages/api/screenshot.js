// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  //console.log(req);
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("uploaded-blob", (blobName) => {
        socket.broadcast.emit("routeToGallery", blobName);
        console.log("routeoGallery");
      });

      socket.on("change-qr-code", (time) => {
        socket.broadcast.emit("create-qr-code", time);
      });
      socket.on("send-blob", () => {
        setTimeout(() => {
          socket.broadcast.emit("receive-blob");
        }, 3000);
      });
    });
  }
  res.end();
};

export default SocketHandler;
