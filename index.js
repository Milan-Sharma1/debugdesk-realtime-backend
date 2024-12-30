import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors()); // Enable CORS for all routes

io.on("connection", (socket) => {
    console.log("A user connected");

    //room join based on roomId recieved from client
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
    });
    // Listen for incoming messages
    socket.on("message", ({ room, message }) => {
        console.log("Received message:", message);

        // Broadcast the message to all connected clients
        io.to(room).emit("message", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
