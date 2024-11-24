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
  _id: string; // MongoDB ObjectId as a string
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
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = "mocked-user-id"; // Mocked userId for demonstration

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://kernel-panic.onrender.com/api/getAllQuestions");
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          setQuestions(data);
          const firstQuestionText = `Question 1: ${data[0].title}`;
          const firstOptionsText = data[0].options
            .map((option: Option, index: number) => `${index + 1}. ${option.text}`)
            .join("\n");
          setTerminalLineData((prevData) => [
            ...prevData,
            firstQuestionText,
            firstOptionsText,
          ]);
        } else {
          setGameOver(true);
          setTerminalLineData((prevData) => [...prevData, "No questions available. Game over!"]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const submitAnswer = async (
    questionId: string,
    selectedOption: string,
    newStats: { health: number; wealth: number; happiness: number }
  ): Promise<boolean> => {
    try {
      const response = await fetch("https://kernel-panic.onrender.com/api/submitAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          answeredQuestion: {
            questionId,
            selectedOption,
          },
          updatedStats: newStats, // Sending updated stats to backend
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return true; // Successfully submitted answer
      } else {
        throw new Error(result.message || "Failed to submit answer.");
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

  const handleInput = async (input: string) => {
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
      health: stats.health + selectedOption.points.health,
      wealth: stats.wealth + selectedOption.points.wealth,
      happiness: stats.happiness + selectedOption.points.happiness,
    };

    // Immediate frontend update
    setTerminalLineData((prevData) => [
      ...prevData,
      `You chose: ${selectedOption.text}`,
      `Updated stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.\n`,
    ]);

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
          `Game Over! Final stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.\nThank you for playing!`,
        ]);
      }
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
