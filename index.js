import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { messageValidation } from "./schemas/messageSchema.js";
import { databases, users } from "./appwrite/config.js";
import { db, msg } from "./appwrite/name.js";
import { ID } from "node-appwrite";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {},
});

//TODO: add the url of render in the appwrite  and enable cors for mydomain only

app.use(cors()); // Enable CORS for all routes
//for testing
app.get("/hello", (req, res) => {
    res.send("Hello, world!");
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("initialSetup", (connectedUserID) => {
        socket.join(connectedUserID); //to receive private msg notification a user must always in selfRoom
        console.log(`Socket ${socket.id} joined selfRoom ${connectedUserID}`);
    });

    socket.on("joinRoom", (id) => {
        socket.join(id); //either quesId or another userId to send msg in group or private
        console.log(`Socket ${socket.id} joined chatRoom ${id}`);
    });
    // Listen for incoming messages
    socket.on("message", async ({ id, data }) => {
        console.log("Received message:", data);
        const result = await messageValidation.safeParseAsync(data);
        if (!result.success) return;
        const [user, response] = await Promise.all([
            users.get(data.userid),
            databases.createDocument(db, msg, ID.unique(), { ...data }),
        ]);
        if (!user || !response) return;
        // Broadcast the message to all connected clients
        io.to(id).to(data.userid).emit("message", data);
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
