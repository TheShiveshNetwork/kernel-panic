// import { quizQuestions } from "./questions";

import React, { useEffect, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import axios from "axios";

const GamePage: React.FC = () => {
    const [terminalLineData, setTerminalLineData] = useState<React.ReactNode[]>([
        <TerminalOutput>Welcome to the Life Choices Game!</TerminalOutput>,
        <br />,
        <TerminalOutput>Loading questions, please wait...</TerminalOutput>,
    ]);

    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [stats, setStats] = useState<{ health: number; happiness: number; wealth: number }>({
        health: 50,
        happiness: 50,
        wealth: 50,
    });

    const [loading, setLoading] = useState(true);

    const handleInput = (input: string) => {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const selectedOptionIndex = parseInt(input) - 1;

        if (
            isNaN(selectedOptionIndex) ||
            selectedOptionIndex < 0 ||
            selectedOptionIndex >= currentQuestion.options.length
        ) {
            setTerminalLineData((prevData) => [
                ...prevData,
                <TerminalOutput>Invalid input. Please choose a valid option.</TerminalOutput>,
                <br />,
            ]);
            return;
        }

        const selectedOption = currentQuestion.options[selectedOptionIndex];

        // Update stats and terminal lines together
        setStats((prevStats) => {
            const newStats = {
                health: Math.max(0, prevStats.health + selectedOption.points.health),
                happiness: Math.max(0, prevStats.happiness + selectedOption.points.happiness),
                wealth: Math.max(0, prevStats.wealth + selectedOption.points.wealth),
            };

            setTerminalLineData((prevData) => [
                ...prevData,
                <br />,
                <TerminalOutput>{`You chose: ${selectedOption.text}`}</TerminalOutput>,
                <br />,
                <TerminalOutput>
                    {`Updated stats - Health: ${newStats.health}, Happiness: ${newStats.happiness}, Wealth: ${newStats.wealth}.`}
                </TerminalOutput>,
                <br />,
            ]);

            return newStats;
        });

        // Move to the next question or end the game
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizQuestions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            const nextQuestion = quizQuestions[nextQuestionIndex];
            setTerminalLineData((prevData) => [
                ...prevData,
                <br />,
                <TerminalOutput>{`Question ${nextQuestionIndex + 1}: ${nextQuestion.content}`}</TerminalOutput>,
                ...nextQuestion.options.map((option: any, index: number) => (
                    <TerminalOutput key={`t-${index}`}>{`${index + 1}. ${option.text}`}</TerminalOutput>
                )),
            ]);
        } else {
            setTerminalLineData((prevData) => [
                ...prevData,
                <TerminalOutput>
                    {`Game Over! Final stats - Health: ${stats.health}, Happiness: ${stats.happiness}, Wealth: ${stats.wealth}.`}
                </TerminalOutput>,
            ]);
            setCurrentQuestionIndex(0);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8080/api/getAllQuestions")
            .then((res) => {
                const questions = res.data;

                // Ensure questions are an array and map them properly
                if (!Array.isArray(questions)) {
                    throw new Error("Invalid response format");
                }

                setQuizQuestions(questions);

                // Display the first question
                if (questions.length > 0) {
                    const firstQuestion = questions[0];
                    setTerminalLineData((prevData) => [
                        <TerminalOutput>Welcome to the Life Choices Game!</TerminalOutput>,
                        <br />,
                        <TerminalOutput>Your initial stats: Health: 50, Happiness: 50, Wealth: 50.</TerminalOutput>,
                        <br />,
                        <TerminalOutput>{`Question 1: ${firstQuestion.content}`}</TerminalOutput>,
                        ...firstQuestion.options.map((option: any, index: number) => (
                            <TerminalOutput key={`tout-${index}`}>{`${index + 1}. ${option.text}`}</TerminalOutput>
                        )),
                    ]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
                setTerminalLineData((prevData) => [
                    ...prevData,
                    <TerminalOutput>Error fetching questions. Please try again later.</TerminalOutput>,
                ]);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Terminal
                    name="Life Choices Game"
                    colorMode={ColorMode.Dark}
                    onInput={handleInput}
                >
                    {terminalLineData}
                </Terminal>
            )}
        </div>
    );
};

export default GamePage;
