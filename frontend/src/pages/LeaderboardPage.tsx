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
                <TerminalOutput
                    key="header"
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.5em",
                        textAlign: "center",
                    }}
                >
                    {"Position".padEnd(10)}{"Team Name".padEnd(25)}{"Points".padStart(10)}
                </TerminalOutput>,
                <TerminalOutput key="divider" style={{ textAlign: "center" }}>
                    {"-".repeat(55)}
                </TerminalOutput>,
                ...data.map((entry, index) => (
                    <TerminalOutput
                        key={`${entry.userId}-${index}`}
                        style={{
                            fontSize: "1.2em",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "5px 0",
                        }}
                    >
                        <span>{(index + 1).toString().padEnd(10)}</span>
                        <span style={{ textAlign: "center", flexGrow: 1 }}>
                            {entry.userId.padEnd(25)}
                        </span>
                        <span>{entry.accumulatedPoints.toString().padStart(10)}</span>
                    </TerminalOutput>
                )),
                <TerminalOutput key="footer" style={{ textAlign: "center" }}>
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
