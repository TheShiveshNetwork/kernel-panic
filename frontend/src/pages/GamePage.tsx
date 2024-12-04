import React, { useState, useEffect } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { PanicApi } from "@/api";
import { toast } from 'react-toastify';


interface Option {
  text: string;
  points: {
    health: number;
    wealth: number;
    happiness: number;
  };
}

interface Question {
  _id: string;
  title: string;
  options: Option[];
}

const GamePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [terminalLineData, setTerminalLineData] = useState<string[]>([
    "Welcome to the Life Choices Game!",
    "Type 'start' to begin the game.\n",
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [stats, setStats] = useState<{ health: number; wealth: number; happiness: number }>({
    health: 50,
    wealth: 50,
    happiness: 50,
  });
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = "mocked-user-id"; // Mocked userId for demonstration

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await PanicApi.get("/getAllQuestions", { timeout: 5000 }); // Increased timeout to 10s
      const data = response.data;

      if (data.length > 0) {
        setQuestions(data);
      } else {
        setGameOver(true);
        setTerminalLineData((prevData) => [...prevData, "No questions available. Game over!"]);
      }
    } catch (err:unknown) {
      if(err instanceof Error){
        setError(err.message);
        setTerminalLineData((prevData) => [
          ...prevData,
          `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
        ]);
      }       
    } finally {
      setIsLoading(false);
    }
  };

  // Start the game
  const startGame = () => {
    if (questions.length === 0) {
      toast.info("Questions are loading...");
      return;
    }

    setCurrentQuestionIndex(0); // Start with the first question
    const firstQuestion = questions[0];
    const questionText = `Question 1: ${firstQuestion.title}`;
    const optionsText = firstQuestion.options
      .map((option, index) => `${index + 1}. ${option.text}`)
      .join("\n");

    setTerminalLineData((prevData) => [...prevData, questionText, optionsText]);
  };

  // Submit answer to the backend and update stats
  const submitAnswer = async (
    questionId: string,
    selectedOption: string,
    newStats: { health: number; wealth: number; happiness: number }
  ): Promise<boolean> => {
    try {
      const response = await PanicApi.post("/submitAnswer", {
        userId,
        answeredQuestion: {
          questionId,
          selectedOption,
        },
        updatedStats: newStats,
      });

      if (response.status === 200) {
        return true; // Successfully submitted answer
      } else {
       toast.error(response.data.message || "Failed to submit answer.");
       return false;
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setTerminalLineData((prevData) => [
        ...prevData,
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ]);
      return false;
    }
  };

  // Handle terminal input
  const handleInput = async (input: string) => {
    if (isLoading) {
      setTerminalLineData((prevData) => [...prevData, "Game is still loading, please wait..."]);
      return;
    }

    if (gameOver) {
      setTerminalLineData((prevData) => [
        ...prevData,
        "Game is over. Restart the application to play again.",
      ]);
      return;
    }

    if (input === "start") {
      if (currentQuestionIndex === null) {
        startGame();
      } else {
        setTerminalLineData((prevData) => [
          ...prevData,
          "Game has already started! Answer the current question.",
        ]);
      }
      return;
    }

    const currentIndex = currentQuestionIndex;
    if (currentIndex === null || currentIndex >= questions.length) {
      setTerminalLineData((prevData) => [...prevData, "Invalid command. Type 'start' to begin."]);
      return;
    }

    const currentQuestion = questions[currentIndex];
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
      health: stats.health + selectedOption.points.health,
      wealth: stats.wealth + selectedOption.points.wealth,
      happiness: stats.happiness + selectedOption.points.happiness,
    };

    // Sync stats with database
    const isAnswerSubmitted = await submitAnswer(
      currentQuestion._id,
      selectedOptionIndex.toString(),
      newStats
    );

    if (isAnswerSubmitted) {
      // Update React state with synced stats
      setStats(newStats);

      // Move to the next question or end the game
      const nextQuestionIndex = currentIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);

        const nextQuestion = questions[nextQuestionIndex];
        const nextQuestionText = `Question ${nextQuestionIndex + 1}: ${nextQuestion.title}`;
        const nextOptionsText = nextQuestion.options
          .map((option, index) => `${index + 1}. ${option.text}`)
          .join("\n");
        setTerminalLineData((prevData) => [
          ...prevData,
          `You chose: ${selectedOption.text}`,
          nextQuestionText,
          nextOptionsText,
        ]);
      } else {
        setGameOver(true);
        setTerminalLineData((prevData) => [
          ...prevData,
          `Game Over! Final stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.\nThank you for playing!`,
        ]);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

    return (
    <div className="container">
      <Terminal name="Life Choices Game" colorMode={ColorMode.Dark} onInput={handleInput}>
        {isLoading && <TerminalOutput>Loading questions...</TerminalOutput>}
        {terminalLineData.map((line, index) => (
          <TerminalOutput key={index}>{line}</TerminalOutput>
        ))}
      </Terminal>
    </div>
  );

};

export default GamePage;
