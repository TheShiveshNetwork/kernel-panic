import { Server } from "socket.io";
import { questionStatusCollection } from "@/storage";

export const listenToQuestionStatusChanges = (io: Server) => {
  const updateLeaderboard = async () => {
    try {
      const leaderboardData = await questionStatusCollection
        .find({})
        .sort({ accumulatedPoints: -1 })
        .limit(10)
        .toArray();

      io.to("leaderboardData").emit("leaderboardUpdate", leaderboardData);
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  const watchChanges = questionStatusCollection.watch();

  watchChanges.on("change", (change) => {
    updateLeaderboard();
  });

  process.on("SIGINT", () => {
    console.log("Closing change stream...");
    watchChanges.close();
    process.exit(0);
  });
};
