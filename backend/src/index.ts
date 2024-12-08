import express, { type Express } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { listenToQuestionStatusChanges } from "./socket/leaderbaord";
import { questionStatusCollection } from "./storage";
import cors from "cors";

import { routes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

let corsConfig = {
  origin: process.env.FRONTEND_URL || "",
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

// Setup socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("joinRoom", async (room) => {
    if (room === "leaderboardData") {
      socket.join("leaderboardData");
      console.log(`User joined room: ${room}`);
      try {
        const leaderboardData = await questionStatusCollection
          .find({})
          .sort({ accumulatedPoints: -1 })
          .limit(10)
          .toArray();

        socket.emit("leaderboardUpdate", leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard data on join:", error);
      }
    } else {
      socket.emit("error", { message: "Room does not exist" });
    }
    }
  );

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
listenToQuestionStatusChanges(io);

server.listen(port, () => {
  console.log(`[server]: Server is running`);
});
