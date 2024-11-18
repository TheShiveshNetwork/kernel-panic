import React, { useState } from "react";
import Terminal, { ColorMode, TerminalOutput, TerminalLine } from "react-terminal-ui";
import { quizQuestions } from "./questions";

const GamePage: React.FC = () => {
    const [terminalLineData, setTerminalLineData] = useState<TerminalLine[]>([
        <TerminalOutput>Welcome to the Life Choices Game!</TerminalOutput>,
        <br />,
        <TerminalOutput>Your initial stats: Health: 50, Happiness: 50, Money: 50.</TerminalOutput>,
        <br />,
        <TerminalOutput>{`Question 1: ${quizQuestions[0].question}`}</TerminalOutput>,
        ...quizQuestions[0].options.map((option, index) => (
            <TerminalOutput>{`${index + 1}. ${option.text}`}</TerminalOutput>
        )),
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [stats, setStats] = useState<{ health: number; happiness: number; money: number }>({
        health: 50,
        happiness: 50,
        money: 50,
    });

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

        // Update stats
        setStats((prevStats) => ({
            health: Math.max(0, prevStats.health + selectedOption.impact.health),
            happiness: Math.max(0, prevStats.happiness + selectedOption.impact.happiness),
            money: Math.max(0, prevStats.money + selectedOption.impact.money),
        }));

        // Update terminal lines
        setTerminalLineData((prevData) => [
            ...prevData,
            <br />,
            <TerminalOutput>{`You chose: ${selectedOption.text}`}</TerminalOutput>,
            <br />,
            <TerminalOutput>
                {`Updated stats - Health: ${stats.health + selectedOption.impact.health}, Happiness: ${
                    stats.happiness + selectedOption.impact.happiness
                }, Money: ${stats.money + selectedOption.impact.money}.`}
            </TerminalOutput>,
            <br />,
        ]);

        // Move to the next question
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizQuestions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            const nextQuestion = quizQuestions[nextQuestionIndex];
            setTerminalLineData((prevData) => [
                ...prevData,
                <br />,
                <TerminalOutput>{`Question ${nextQuestionIndex + 1}: ${nextQuestion.question}`}</TerminalOutput>,
                ...nextQuestion.options.map((option, index) => (
                    <TerminalOutput>{`${index + 1}. ${option.text}`}</TerminalOutput>
                )),
            ]);
        } else {
            setTerminalLineData((prevData) => [
                ...prevData,
                <TerminalOutput>
                    {`Game Over! Final stats - Health: ${stats.health}, Happiness: ${stats.happiness}, Money: ${stats.money}.`}
                </TerminalOutput>,
            ]);
        }
    };

    return (
        <div className="container">
            <Terminal
                name="Life Choices Game"
                colorMode={ColorMode.Dark}
                onInput={handleInput}
            >
                {terminalLineData}
            </Terminal>
        </div>
    );
};

export default GamePage;
