import { config } from "@/config";
import React, { useEffect, useState } from "react";
import Terminal, { TerminalOutput, ColorMode } from "react-terminal-ui";
import { io } from "socket.io-client";

interface LeaderboardEntry {
    userId: string;
    name: string;
    accumulatedPoints: number;
}

const LeaderboardPage: React.FC = () => {
    const [terminalLineData, setTerminalLineData] = useState<React.ReactNode[]>([
        <TerminalOutput key="header">Live Leaderboard</TerminalOutput>,
        <TerminalOutput key="divider">---------------------</TerminalOutput>,
        <TerminalOutput key="loading">Waiting for updates...</TerminalOutput>,
    ]);

    useEffect(() => {
        const socket = io(config.socketUrl);

        socket.emit("joinRoom", "leaderboardData");

        socket.on("leaderboardUpdate", (data: LeaderboardEntry[]) => {
            const updatedTerminalLines = [
                <div className="flex">
                    <div className="w-60">Position</div>
                    <div className="w-full">Team Name</div>
                    <div className="w-40">Points</div>
                </div>,
                <TerminalOutput key="divider">
                    {"-".repeat(55)}
                </TerminalOutput>,
                ...data.map((entry, index) => (
                    <div className="flex justify-between">
                        <div className="w-60">{index + 1}</div>
                        <div className="w-full">
                            {entry.name}
                        </div>
                        <div className="w-40">{entry.accumulatedPoints}</div>
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
        <div className="h-screen w-screen bg-[var(--primary-bg)]">
            <Terminal name={`${config.name} Leaderboard`} colorMode={ColorMode.Dark} prompt="">
                <div className="mx-auto">{terminalLineData}</div>
            </Terminal>
        </div>
    );
};

export default LeaderboardPage;
