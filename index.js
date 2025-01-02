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
const allowedOrigins = [process.env.CORS_ORIGIN];
const isOriginAllowed = (origin) => {
    return allowedOrigins.includes(origin);
};

const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: allowedOrigins,
    },
    allowRequest: (req, callback) => {
        const origin = req.headers.origin;
        if (isOriginAllowed(origin)) {
            // Allow the connection
            callback(null, true);
        } else {
            // Deny the connection
            callback("Origin not allowed", false);
        }
    },
});

app.use(
    cors({
        origin: allowedOrigins,
    })
);

//for testing
app.get("/hello", (req, res) => {
    res.send("Hello, world!");
});

io.on("connection", (socket) => {
    socket.on("initialSetup", (connectedUserID) => {
        socket.join(connectedUserID); //to receive private msg notification a user must always in selfRoom
    });

    socket.on("joinRoom", (id) => {
        socket.join(id); //either quesId or another userId to send msg in group or private
    });
    // Listen for incoming messages
    socket.on("message", async ({ id, data }) => {
        try {
            // Validate
            const result = await messageValidation.safeParseAsync(data);
            if (!result.success) return;
            //save msg in db
            const [user, response] = await Promise.all([
                users.get(data.userid),
                databases.createDocument(db, msg, ID.unique(), { ...data }),
            ]);
            if (!user || !response) {
                console.log("User or database response is missing.");
                return;
            }
            // Broadcast the message to all connected clients
            io.to(id).to(data.userid).emit("message", data);
        } catch (error) {
            // Handle Appwrite or other errors
            console.error("Error processing message:", error);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
