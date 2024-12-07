import React, { useState, useEffect } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { PanicApi } from "@/api";
import { toast } from 'react-toastify';
import { config } from "@/config";
import { TerminalError } from "@/components/commons/TerminalError";
import { TerminalColorText } from "@/components/commons/TerminalColorText";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Question } from "@/helpers/common-types";

const GamePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [terminalLineData, setTerminalLineData] = useState<(string | JSX.Element)[]>([
    "Welcome to",
    `${config.asciiName}\n`,
    // `${config.asciiLogo}\n`,
    `Type '${config.commonCommands.helpCommand.name}' to see all available commands.\n`,
    `Type '${config.commonCommands.startCommand.name}' to start the game.\n\n`,
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
  const navigate = useNavigate();
  const { logout } = useAuth();

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log("Error submitting answer:", error);
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalError>
          Error: {error instanceof Error ? error.message : "Unknown error"}
          <p>{error.response.data.error}</p>
        </TerminalError>,
      ]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const startGame = () => {
    if (questions.length === 0) {
      toast.info("Questions are loading...");
      return;
    }

    setCurrentQuestionIndex(0);
    const firstQuestion = questions[0];
    const questionText = `Question 1: ${firstQuestion.title}`;
    const optionsText = firstQuestion.options
      .map((option, index) => `${index + 1}. ${option.text}`)
      .join("\n");

    setTerminalLineData((prevData) => [...prevData, questionText, optionsText]);
  };

  const submitAnswer = async (
    questionId: string,
    selectedOption: string,
  ) => {
    try {
      const response = await PanicApi.post("/submitAnswer", {
        answeredQuestion: {
          questionId,
          selectedOption,
        },
      });

      if (response.status === 201) {
        return true;
      } else if (response.status === 200) {
        return true;
      } else {
        toast.error(response.data.message || "Failed to submit answer.");
        return false;
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log("Error submitting answer:", error);
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalError>
          Error: {error instanceof Error ? error.message : "Unknown error"}
          <p>{error.response.data.error}</p>
        </TerminalError>,
      ]);
      return false;
    }
  };

  const handleInput = async (input: string) => {
    if (isLoading) {
      setTerminalLineData((prevData) => [...prevData, "Game is still loading, please wait..."]);
      return;
    }

    if (gameOver) {
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalColorText color="blue">{config.asciiGameOver}</TerminalColorText>,
        <TerminalColorText color="white">Hurray! You have completed all questions.</TerminalColorText>,
        <TerminalColorText color="white">Check out your rank on <Link to={"/leaderboard"} className="underline">Leaderboard</Link>.</TerminalColorText>,
      ]);
      return;
    }

    setTerminalLineData((prevData) => [...prevData, `> ${input}`]);

    if (input === config.commonCommands.startCommand.name) {
      config.commonCommands.startCommand.command(setTerminalLineData, currentQuestionIndex, startGame);
      return;
    }

    if (input === config.commonCommands.continueCommand.name) {
      config.commonCommands.continueCommand.command(setTerminalLineData, currentQuestionIndex, questions);
      return;
    }

    if (input === config.commonCommands.clearCommand.name) {
      config.commonCommands.clearCommand.command(setTerminalLineData);
      return;
    }

    if (input === config.commonCommands.helpCommand.name) {
      config.commonCommands.helpCommand.command(setTerminalLineData);
      return;
    }

    if (input === config.commonCommands.describeCommand.name) {
      config.commonCommands.describeCommand.command(setTerminalLineData);
      return;
    }

    if (input === config.commonCommands.whoamiCommand.name) {
      await config.commonCommands.whoamiCommand.command(setTerminalLineData);
      return;
    }

    if (input === config.commonCommands.logoutCommand.name) {
      config.commonCommands.logoutCommand.command(setTerminalLineData);
      logout();
      navigate("/");
    }

    if (input === config.commonCommands.leaderboardCommand.name) {
      navigate("/leaderboard");
    }

    const currentIndex = currentQuestionIndex;
    if (currentIndex === null || currentIndex >= questions.length) {
      setTerminalLineData((prevData) => [
        ...prevData, 
        <TerminalColorText color="blue">Invalid command. Type '{config.commonCommands.helpCommand.name}' to see all available commands.</TerminalColorText>
      ]);
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
        <TerminalColorText color="blue">Invalid command. Type '{config.commonCommands.helpCommand.name}' to see all available commands.</TerminalColorText>,
      ]);
      return;
    }

    const selectedOption = currentQuestion.options[selectedOptionIndex];
    const newStats = {
      health: stats.health + selectedOption.points.health,
      wealth: stats.wealth + selectedOption.points.wealth,
      happiness: stats.happiness + selectedOption.points.happiness,
    };

    const isAnswerSubmitted = await submitAnswer(
      currentQuestion._id,
      selectedOptionIndex.toString(),
    );

    if (isAnswerSubmitted) {
      setStats(newStats);
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
          <TerminalColorText color="blue">{config.asciiGameOver}</TerminalColorText>,
          <TerminalColorText color="white">Hurray! You have completed all questions.</TerminalColorText>,
          <TerminalColorText color="blue">Final stats - Health: {newStats.health}, Wealth: {newStats.wealth}, Happiness: {newStats.happiness}</TerminalColorText>,
          <TerminalColorText color="white">Check out your rank on <Link to={"/leaderboard"} className="underline">Leaderboard</Link>.</TerminalColorText>,
        ]);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="h-screen w-screen bg-[var(--primary-bg)]">
      <Terminal name={config.name} colorMode={ColorMode.Dark} onInput={handleInput}>
        {isLoading && <TerminalOutput>Loading questions...</TerminalOutput>}
        {terminalLineData.map((line, index) => (
          <TerminalOutput key={index}>{line}</TerminalOutput>
        ))}
      </Terminal>
    </div>
  );
};

export default GamePage;
