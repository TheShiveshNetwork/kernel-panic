import React, { useEffect, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { PanicApi } from "@/api";
import Loading from "@/components/loading";
import { config } from "@/config";

// Define types for the API response
type Option = {
  text: string;
  points: {
    health: number;
    wealth: number;
    happiness: number;
  };
};

type Question = {
  _id: string;
  title: string;
  content: string;
  options: Option[];
  index?: number | null;
};

const GamePage: React.FC = () => {
  const [terminalLineData, setTerminalLineData] = useState<React.ReactNode[]>([
    `Welcome to ${config.name}`,
    <br />,
    <TerminalOutput>Press Enter to start the game</TerminalOutput>,
  ]);

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [stats, setStats] = useState<{
    health: number;
    happiness: number;
    wealth: number;
  }>({
    health: 50,
    happiness: 50,
    wealth: 50,
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Function to handle user input
  const handleInput = (input: string) => {
    if (loading) return; // Ignore input if still loading

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const selectedOptionIndex = parseInt(input) - 1;

    // Validate user input
    if (
      isNaN(selectedOptionIndex) ||
      selectedOptionIndex < 0 ||
      selectedOptionIndex >= currentQuestion.options.length
    ) {
      if(currentQuestionIndex == 0){
        return displayQuestion(0);
      }
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalOutput>
          Invalid input. Please choose a valid option.
        </TerminalOutput>,
        <br />,
      ]);
      return;
    }

    const selectedOption = currentQuestion.options[selectedOptionIndex];

    // Update stats and terminal lines together
    setStats((prevStats) => {
      const updatedStats = {
        health: Math.max(0, prevStats.health + selectedOption.points.health),
        happiness: Math.max(
          0,
          prevStats.happiness + selectedOption.points.happiness
        ),
        wealth: Math.max(0, prevStats.wealth + selectedOption.points.wealth),
      };

      setTerminalLineData((prevData) => [
        ...prevData,
        <br />,
        <TerminalOutput>{`You chose: ${selectedOption.text}`}</TerminalOutput>,
        <br />,
        <TerminalOutput>
          {`Updated stats - Health: ${updatedStats.health}, Happiness: ${updatedStats.happiness}, Wealth: ${updatedStats.wealth}.`}
        </TerminalOutput>,
        <br />,
      ]);

      return updatedStats;
    });

    // Move to the next question or end the game
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      displayQuestion(nextQuestionIndex);
    } else {
      setTerminalLineData((prevData) => [
        ...prevData,
        <br />,
        <TerminalOutput>
          {`Game Over! Final stats - Health: ${stats.health}, Happiness: ${stats.happiness}, Wealth: ${stats.wealth}.`}
        </TerminalOutput>,
      ]);
    }
  };

  // Function to display a specific question
  const displayQuestion = (questionIndex: number) => {
    const question = quizQuestions[questionIndex];
    setTerminalLineData((prevData) => [
      ...prevData,
      <br />,
      <TerminalOutput>{`Question ${questionIndex + 1}: ${
        question.content
      }`}</TerminalOutput>,
      ...question.options.map((option: Option, index: number) => (
        <TerminalOutput key={`option-${index}`}>{`${index + 1}. ${
          option.text
        }`}</TerminalOutput>
      )),
    ]);
  };

  // Fetch questions from the API
  useEffect(() => {
    setLoading(true);
    PanicApi.get("/getAllQuestions")
      .then((res) => {
        const questions = res.data;
        if (quizQuestions.length == 0) {
          setQuizQuestions(questions);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setTerminalLineData((prevData) => [
          ...prevData,
          <br />,
          <TerminalOutput>
            Error fetching questions. Please try again later.
          </TerminalOutput>,
        ]);
        setLoading(false);
      });
  }, []);


  return (
    <div className="container">
      <Terminal
        name="Life Choices Game"
        colorMode={ColorMode.Dark}
        onInput={handleInput}
      >
        {loading ? <Loading /> : null}
        {terminalLineData}
      </Terminal>
    </div>
  );
};

export default GamePage;
