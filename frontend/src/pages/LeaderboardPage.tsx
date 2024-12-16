import { config } from "@/config";
import React, { useEffect, useState, useCallback } from "react";
import Terminal, { TerminalOutput, ColorMode } from "react-terminal-ui";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

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
    const [scrollIndex, setScrollIndex] = useState(0); // For scroll control
    const [fullLeaderboard, setFullLeaderboard] = useState<LeaderboardEntry[]>([]);

    const navigate = useNavigate();  // Initialize useNavigate for navigation

    const updateLeaderboard = useCallback((data: LeaderboardEntry[]) => {
        setFullLeaderboard(data);
        const visibleData = data.slice(scrollIndex, scrollIndex + 10); // Show 10 entries at a time

        const updatedTerminalLines = [
            <div className="flex" key="header-row">
                <div className="w-20">Position</div>
                <div className="w-full">Team Name</div>
                <div className="w-40">Points</div>
            </div>,
            <TerminalOutput key="divider">
                {"-".repeat(55)}
            </TerminalOutput>,
            ...visibleData.map((entry, index) => (
                <div className="flex justify-between" key={entry.userId}>
                    <div className="w-20">{scrollIndex + index + 1}</div>
                    <div className="w-full">{entry.name}</div>
                    <div className="w-40">{entry.accumulatedPoints}</div>
                </div>
            )),
            <TerminalOutput key="footer">
                {"-".repeat(55)}
            </TerminalOutput>,
        ];

        setTerminalLineData(updatedTerminalLines);
    }, [scrollIndex]);

    useEffect(() => {
        const socket = io(config.socketUrl);

        socket.emit("joinRoom", "leaderboardData");

        socket.on("leaderboardUpdate", (data: LeaderboardEntry[]) => {
            updateLeaderboard(data);
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection failed:", err);
        });

        return () => {
            socket.disconnect();
        };
    }, [updateLeaderboard]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    setScrollIndex((prev) => Math.max(prev - 1, 0));
                    break;
                case "ArrowDown":
                    setScrollIndex((prev) =>
                        Math.min(prev + 1, fullLeaderboard.length - 10)
                    );
                    break;
                case "r":
                case "R":
                    setScrollIndex(0); 
                    updateLeaderboard(fullLeaderboard);
                    break;
                case "x":
                case "X":
                    if (event.ctrlKey) {
                        navigate("/panic");
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [fullLeaderboard, updateLeaderboard, navigate]);

    return (
        <div className="h-screen w-screen bg-black text-white p-4 flex flex-col">
            {/* Terminal Area */}
            <div className="flex-grow overflow-auto">
                <Terminal
                    name={`${config.name} Leaderboard`}
                    colorMode={ColorMode.Dark}
                    prompt=""
                >
                    <div className="flex flex-col gap-2 mx-auto">{terminalLineData}</div>
                </Terminal>
            </div>

            <div className="bg-black text-white text-sm p-2 mt-4 border-t border-gray-500">
                <h2 className="text-xs font-semibold mb-2">Shortcut Keys:</h2>
                <ul className="list-none">
                    <li><strong>Arrow Up</strong>: Scroll up through the leaderboard.</li>
                    <li><strong>Arrow Down</strong>: Scroll down through the leaderboard.</li>
                    <li><strong>Ctrl + R</strong>: Refresh the leaderboard.</li>
                    <li><strong>Ctrl + X</strong>: Go back to the game page.</li>
                </ul>
            </div>
        </div>
    );
};

export default LeaderboardPage;
