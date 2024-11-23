import { log } from "console";
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
    const [terminalLineData, setTerminalLineData] = useState<JSX.Element[]>([
        <TerminalOutput>Welcome to the Life Choices Game!</TerminalOutput>,
        <br />,
        <TerminalOutput>Your initial stats: Health: 50, Wealth: 50, Happiness: 50.</TerminalOutput>,
        <br />,
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [stats, setStats] = useState<{ health: number; wealth: number; happiness: number }>({
        health: 50,
        wealth: 50,
        happiness: 50,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState(false); // Track if the game is over

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
                    setTerminalLineData((prevData) => [
                        ...prevData,
                        <TerminalOutput key="firstQuestion">{`Question 1: ${data[0].title}`}</TerminalOutput>,
                        ...data[0].options.map((option: Option, index: number) => (
                            <TerminalOutput key={`option-${index}`}>{`${index + 1}. ${option.text}`}</TerminalOutput>
                        )),
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

    // Handle user input to select an option
    const handleInput = (input: string) => {
      if (gameOver) {
          // If the game is over, ignore the input
          setTerminalLineData((prevData) => [
              ...prevData,
              <TerminalOutput key="gameOverInput">Game is over. No more input allowed.</TerminalOutput>,
          ]);
          return;
      }
  
      const currentQuestion = questions[currentQuestionIndex];
      const selectedOptionIndex = parseInt(input) - 1;
  
      // Validate user input
      if (
          isNaN(selectedOptionIndex) ||
          selectedOptionIndex < 0 ||
          selectedOptionIndex >= currentQuestion.options.length
      ) {
          setTerminalLineData((prevData) => [
              ...prevData,
              <TerminalOutput key="error">Invalid input. Please choose a valid option.</TerminalOutput>,
              <br />,
          ]);
          return;
      }
  
      const selectedOption = currentQuestion.options[selectedOptionIndex];
  
      // Calculate new stats based on selected option
      const newStats = {
          health: Math.max(0, stats.health + selectedOption.points.health),
          wealth: Math.max(0, stats.wealth + selectedOption.points.wealth),
          happiness: Math.max(0, stats.happiness + selectedOption.points.happiness),
      };
  
      // Update stats
      setStats(newStats);
      
  
      // Update terminal output with choice and new stats
      setTerminalLineData((prevData) => [
          ...prevData,
          <br />,
          <TerminalOutput key="choice">You chose: {selectedOption.text}</TerminalOutput>,
          <br />,
          <TerminalOutput key="updatedStats">
              {`Updated stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.`}
          </TerminalOutput>,
          <br />,
      ]);
      
      // Move to next question or end game if all questions are answered
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
          const nextQuestion = questions[nextQuestionIndex];
          setTerminalLineData((prevData) => [
              ...prevData,
              <br />,
              <TerminalOutput key="nextQuestion">{`Question ${nextQuestionIndex + 1}: ${nextQuestion.title}`}</TerminalOutput>,
              ...nextQuestion.options.map((option: Option, index: number) => (
                  <TerminalOutput key={`option-${index}`}>{`${index + 1}. ${option.text}`}</TerminalOutput>
              )),
          ]);
      } else {
          // Set game over once all questions are answered
          setGameOver(true);
          // Make sure the final stats reflect the most updated state at the end
          setTerminalLineData((prevData) => [
              ...prevData,
              <TerminalOutput key="gameOver">
                  {`Game Over! Final stats - Health: ${newStats.health}, Wealth: ${newStats.wealth}, Happiness: ${newStats.happiness}.`}
              </TerminalOutput>,
          ]);
      }


  };
  

    // Loading and error handling
    if (isLoading) {
        return <div>Loading questions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <Terminal name="Life Choices Game" colorMode={ColorMode.Dark} onInput={handleInput}>
                {terminalLineData}
            </Terminal>
        </div>
    );
};

export default GamePage;
