import React, { useEffect, useState } from "react";
import Terminal, { TerminalOutput, ColorMode } from "react-terminal-ui";
import { io } from "socket.io-client";

interface LeaderboardEntry {
    userId: string;
    accumulatedPoints: number;
}

const LeaderboardPage: React.FC = () => {
    const [terminalLineData, setTerminalLineData] = useState<React.ReactNode[]>([
        <TerminalOutput key="header">Live Leaderboard</TerminalOutput>,
        <TerminalOutput key="divider">---------------------</TerminalOutput>,
        <TerminalOutput key="loading">Waiting for updates...</TerminalOutput>,
    ]);

    useEffect(() => {
        const socket = io("http://localhost:8080");

        socket.emit("joinRoom", "leaderboardData");

        socket.on("leaderboardUpdate", (data: LeaderboardEntry[]) => {
            const updatedTerminalLines = [
                <TerminalOutput key="header">
                    {"Position" + "Team Name".padStart(15) + "Points".padStart(32)}
                </TerminalOutput>,
                <TerminalOutput key="divider">
                    {"-".repeat(55)}
                </TerminalOutput>,
                ...data.map((entry, index) => (
                    <div className="flex justify-between">
                        <span>{(index + 1).toString().padEnd(10)}</span>
                        <span style={{ textAlign: "center", flexGrow: 1 }}>
                            {entry.userId.padEnd(25)}
                        </span>
                        <span>{entry.accumulatedPoints.toString().padStart(10)}</span>
                    </div>
                )),
                <TerminalOutput key="footer">
                    {"-".repeat(55)}
                </TerminalOutput>,
            ];

            setTerminalLineData(updatedTerminalLines);
        });


        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <Terminal name="Leaderboard" colorMode={ColorMode.Dark} prompt="">
                <div className="mx-auto"> {terminalLineData}</div>
            </Terminal>
        </div>
    );
};

export default LeaderboardPage;
