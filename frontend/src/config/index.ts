import { continueGameCommandHandler, describeCommandHandler, helpCommandHandler, ISetTerminalData, logoutCommandHandler, startGameCommandHandler, whoamiCommandHandler } from "@/commands";
import { Question } from "@/helpers/common-types";

const asciiName = `
 __  __     ______     ______     __   __     ______     __            ______   ______     __   __     __     ______    
/\\ \\/ /    /\\  ___\\   /\\  == \\   /\\ "-.\\ \\   /\\  ___\\   /\\ \\          /\\  == \\ /\\  __ \\   /\\ "-.\\ \\   /\\ \\   /\\  ___\\   
\\ \\  _"-.  \\ \\  __\\   \\ \\  __<   \\ \\ \\-.  \\  \\ \\  __\\   \\ \\ \\____     \\ \\  _-/ \\ \\  __ \\  \\ \\ \\-.  \\  \\ \\ \\  \\ \\ \\____  
 \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\  \\ \\_____\\  \\ \\_____\\     \\ \\_\\    \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\  \\ \\_\\  \\ \\_____\\ 
  \\/_/\\/_/   \\/_____/   \\/_/ /_/   \\/_/ \\/_/   \\/_____/   \\/_____/      \\/_/     \\/_/\\/_/   \\/_/ \\/_/   \\/_/   \\/_____/ 
                                                                                                                        
`;

const asciiLogo = `
⠀⠈⠀⠀⣠⣶⣶⣴⣶⣦⣴⣶⣤⣶⣶⣴⣶⣮⣽⣶⣤⣾⣶⣴⡶⣦⡀⠀⠀
⠀⠀⠀⢰⣿⢳⡼⣿⡒⣿⡟⣜⣿⢗⣺⣿⢆⣿⡟⣜⣿⡇⣾⣿⠱⣻⣧⠀⠀
⠀⠀⠀⣾⣏⡟⡜⣥⡙⣝⢫⣜⡹⣊⠖⣍⠦⡹⢱⡊⢽⡘⡥⢋⡵⠱⣿⡄⠀
⠀⠀⢰⣿⢦⡹⢜⠦⣱⢊⣶⢻⣿⣔⢫⡜⢎⡕⣣⣽⣶⣍⢺⡱⢎⡳⣹⣇⠀
⠀⠀⣼⡟⢆⠇⣏⠳⣵⡟⢻⣷⣿⣿⣶⣘⣷⣾⣿⡿⠿⣿⡦⣙⢆⢳⢩⣿⠀
⠀⠀⣿⠏⡌⡚⠤⢋⣿⣇⠘⠿⠈⠙⢿⣿⡿⣿⠁⠀⠀⣼⡷⢉⠿⡟⠤⣿⡇
⠀⢰⣿⠐⡂⠱⠈⢅⠊⠿⣶⣤⣠⣤⡾⠟⢷⣦⣤⣤⣾⠟⡁⠎⡐⢈⠒⣸⡇
⠀⢸⡿⠀⡂⠁⣉⠀⠡⠉⡘⢍⣽⠟⠛⠛⠛⠛⣿⡉⠂⢤⣄⣡⠄⢈⠐⢸⣿
⠀⢸⡇⠀⢻⡿⠏⠀⠀⠁⢀⠈⣿⣤⣤⣤⣤⣤⣿⡇⠀⠈⠛⠋⠀⠀⠂⢸⣿
⠀⢸⣯⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⡇⠀⢠⣤⣤⠄⠀⠀⢸⣿
⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⡇⠀⠘⢿⡟⠀⠀⠀⢸⡇
⠀⠀⣿⡦⠤⣿⣻⣯⠤⠤⠤⠤⠿⠿⣿⣿⡿⠿⠿⠤⠤⠴⠬⠤⠤⠤⠤⣿⠃
⠀⠀⠘⢷⣄⠀⠉⠀⠀⠀⠀⠀⠀⠈⠛⠙⠛⠃⠀⠀⠀⠀⠀⠀⠀⢀⣼⠏⠀
⠀⠀⠀⠈⠙⠿⣦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⡾⠟⠁⠀⠀
⠤⠀⠄⠀⠄⠀⠀⠉⠉⠛⠛⠻⠿⠿⠿⠾⠿⠿⠿⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀
`;

const asciiGameOver = `

_______  _______  _______  _______    _______           _______  _______ 
(  ____ \\(  ___  )(       )(  ____ \\  (  ___  )|\\     /|(  ____ \\(  ____ )
| (    \\/| (   ) || () () || (    \\/  | (   ) || )   ( || (    \\/| (    )|
| |      | (___) || || || || (__      | |   | || |   | || (__    | (____)|
| | ____ |  ___  || |(_)| ||  __)     | |   | |( (   ) )|  __)   |     __)
| | \\_  )| (   ) || |   | || (        | |   | | \\ \\_/ / | (      | (\\ (   
| (___) || )   ( || )   ( || (____/\\  | (___) |  \\   /  | (____/\\| ) \\ \\__
(_______)|/     \\||/     \\|(_______/  (_______)   \\_/   (_______/|/   \\__/

`;

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
    asciiLogo: asciiLogo,
    asciiGameOver: asciiGameOver,
    localBackendUrl: "http://localhost:8080/api",
    backendApiUrl: "https://kernel-panic.onrender.com/api",
    localSocketUrl: "http://localhost:8080",
    socketUrl: "https://kernel-panic.onrender.com",
    commonCommands: {
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
    },
    teamLink: "https://ieee-ritb-website.vercel.app/web_resources",
    githubLink: "https://github.com/TheShiveshNetwork/kernel-panic",
}