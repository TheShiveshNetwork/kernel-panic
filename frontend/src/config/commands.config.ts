import { continueGameCommandHandler, describeCommandHandler, helpCommandHandler, ISetTerminalData, logoutCommandHandler, startGameCommandHandler, whoamiCommandHandler } from "@/commands";
import { Question } from "@/common-types";

export const commonCommands = {
    helpCommand: {
        name: "help",
        description: "List all available commands",
        command: (setTerminalData:ISetTerminalData) => helpCommandHandler(setTerminalData),
    },
    clearCommand: {
        name: "clear",
        description: "Clear the terminal screen",
        command: (setTerminalData:ISetTerminalData) => setTerminalData([]),
    },
    startCommand: {
        name: "start-game",
        description: "Start the game",
        command: (startGame: () => void) => startGameCommandHandler(startGame),
    },
    continueCommand: {
        name: "continue-game",
        description: "Continue the game from where you left",
        command: (setTerminalData:ISetTerminalData, currentIndex:number|null, questions:Question[]) => continueGameCommandHandler(setTerminalData, currentIndex, questions),
    },
    describeCommand: {
        name: "describe",
        description: "Describe kernel panic",
        command: (setTerminalData:ISetTerminalData) => describeCommandHandler(setTerminalData),
    },
    whoamiCommand: {
        name: "whoami",
        description: "Show current logged in user",
        command: async (setTerminalData:ISetTerminalData) => await whoamiCommandHandler(setTerminalData),
    },
    logoutCommand: {
        name: "logout",
        description: "Logout the current user",
        command: (setTerminalData:ISetTerminalData) => logoutCommandHandler(setTerminalData),
    },
    leaderboardCommand: {
        name: "leaderboard",
        description: "View the leaderboard",
        command: () => {},
    },
};
