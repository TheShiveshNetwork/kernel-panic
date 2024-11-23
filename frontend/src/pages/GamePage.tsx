import React, { useState, useEffect } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

interface Option {
    text: string;
    points: {
        health: number;
        wealth: number;
        happiness: number;
    };
}

interface Question {
    title: string;
    options: Option[];
}

const GamePage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [terminalLineData, setTerminalLineData] = useState<string[]>([
        "Welcome to the Life Choices Game!",
        "\nYour initial stats: Health: 50, Wealth: 50, Happiness: 50.\n",
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [stats, setStats] = useState<{ health: number; wealth: number; happiness: number }>({
        health: 50,
        wealth: 50,
        happiness: 50,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState(false);

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://kernel-panic.onrender.com/api/getAllQuestions");
                if (!response.ok) {
                    throw new Error(`Failed to fetch questions: ${response.statusText}`);
                }
                const data = await response.json();
                setQuestions(data);

                // Set the first question only once after fetching
                if (data.length > 0) {
                    const firstQuestionText = `Question 1: ${data[0].title}`;
                    const firstOptionsText = data[0].options
                        .map((option: Option, index: number) => `${index + 1}. ${option.text}`)
                        .join("\n");
                    setTerminalLineData((prevData) => [
                        ...prevData,
                        firstQuestionText,
                        firstOptionsText,
                    ]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        console.log("Updated stats:", stats);
    }, [stats]);

    const handleInput = (input: string) => {
        if (gameOver) {
            setTerminalLineData((prevData) => [
                ...prevData,
                "Game is over. No more input allowed.",
            ]);
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const selectedOptionIndex = parseInt(input) - 1;

        if (
            isNaN(selectedOptionIndex) ||
            selectedOptionIndex < 0 ||
            selectedOptionIndex >= currentQuestion.options.length
        ) {
            setTerminalLineData((prevData) => [
                ...prevData,
                "Invalid input. Please choose a valid option.",
            ]);
            return;
        }

        const selectedOption = currentQuestion.options[selectedOptionIndex];
        const newStats = {
            health: Math.max(0, stats.health + selectedOption.points.health),
            wealth: Math.max(0, stats.wealth + selectedOption.points.wealth),
            happiness: Math.max(0, stats.happiness + selectedOption.points.happiness),
        };

        setStats(newStats);

        setTerminalLineData((prevData) => [
            ...prevData,
            `You chose: ${selectedOption.text}`,
            `Updated stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.\n`,
        ]);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            const nextQuestion = questions[nextQuestionIndex];
            const nextQuestionText = `Question ${nextQuestionIndex + 1}: ${nextQuestion.title}`;
            const nextOptionsText = nextQuestion.options
                .map((option: Option, index: number) => `${index + 1}. ${option.text}`)
                .join("\n");
            setTerminalLineData((prevData) => [
                ...prevData,
                nextQuestionText,
                nextOptionsText,
            ]);
        } else {
            setGameOver(true);
            setTerminalLineData((prevData) => [
                ...prevData,
                `Game Over! Final stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.`,
            ]);
        }
    };

    if (isLoading) {
        return <div>Loading questions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <Terminal name="Life Choices Game" colorMode={ColorMode.Dark} onInput={handleInput}>
                {terminalLineData.map((line, index) => (
                    <TerminalOutput key={index}>{line}</TerminalOutput>
                ))}
            </Terminal>
        </div>
    );
};

export default GamePage;
