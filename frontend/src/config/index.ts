import { commonRoutes } from "./routes.config";
import { asciiGameOver, asciiLogo, asciiName } from "./ascii.config";
import { commonCommands } from "./commands.config";

export const config = {
    name: 'Kernel Panic',
    description: `
    A terminal-based game that is inspired from Mr. Robot eXit Game. 
    The game is about making choices that impact your life. 
    It has 3 perspectives: Wealth, Health, and Happiness.
    Answer the questions and get ranked on the leaderboard.

    Developed with ❤️ by the IEEE Web Resources Team.
    `,
    asciiName: asciiName,
    logo: "",
    routes: commonRoutes,
    asciiLogo: asciiLogo,
    asciiGameOver: asciiGameOver,
    commonCommands: commonCommands,
    localBackendUrl: "http://localhost:8080/api",
    backendApiUrl: "https://kernel-panic.onrender.com/api",
    localSocketUrl: "http://localhost:8080",
    socketUrl: "https://kernel-panic.onrender.com",
    teamLink: "https://ieee-ritb-website.vercel.app/web_resources",
    githubLink: "https://github.com/TheShiveshNetwork/kernel-panic",
}