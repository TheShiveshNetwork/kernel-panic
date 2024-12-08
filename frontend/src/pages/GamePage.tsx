import { useState, useEffect } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { PanicApi } from "@/api";
import { toast } from 'react-toastify';
import { config } from "@/config";
import { TerminalError } from "@/components/commons/TerminalError";
import { TerminalColorText } from "@/components/commons/TerminalColorText";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Question } from "@/helpers/common-types";
import { FormatImageToAscii } from "@/helpers/common-functions";
import TerminalLoading from "@/components/terminal-loader";

const GamePage = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  function gameOver() {
    setTerminalLineData((prevData) => [
      ...prevData,
      <TerminalColorText color="white">You have already completed all questions.</TerminalColorText>,
      <TerminalColorText color="white">Check out your rank on <Link to={"/leaderboard"} className="underline">Leaderboard</Link>.</TerminalColorText>,
    ]);
    return;
  };

  const startGame = () => {
    if (questions.length === 0) {
      toast.info("Questions are loading...");
      return;
    }
    let currentQuestion: Question;
    if (currentQuestionIndex === null) {
      setCurrentQuestionIndex(0);
      currentQuestion = questions[0];
    } else if (currentQuestionIndex < questions.length) {
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalError>Error: The game has already started</TerminalError>,
      ]);
      return;
    } else {
      gameOver();
      return;
    }
    const optionsText = currentQuestion.options
      .map((option, index) => `${index + 1}. ${option.text}`)
      .join("\n");
    setTerminalLineData((prevData) => [
      ...prevData,
      <div className="whitespace-pre-wrap">{FormatImageToAscii(currentQuestion.image)}</div>,
      `\nQuestion ${(currentQuestionIndex || 0) +1}: ${currentQuestion.question}\n`,
      <br />,
      optionsText,
    ]);
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
    } catch (error: any) {
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

    setTerminalLineData((prevData) => [...prevData, `> ${input}`]);

    if (input === config.commonCommands.startCommand.name) {
      config.commonCommands.startCommand.command(startGame);
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

    if (currentQuestionIndex === null || currentQuestionIndex >= questions.length) {
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalColorText color="blue">Invalid command. Type '{config.commonCommands.helpCommand.name}' to see all available commands.</TerminalColorText>
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
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);

        const nextQuestion = questions[nextQuestionIndex];
        const nextOptionsText = nextQuestion.options
          .map((option, index) => `${index + 1}. ${option.text}`)
          .join("\n");
        setTerminalLineData((prevData) => [
          ...prevData,
          `You chose: ${selectedOption.text}`,
          <br />,
          <div className="whitespace-pre-wrap">{FormatImageToAscii(nextQuestion.image)}</div>,
          `\nQuestion ${nextQuestionIndex + 1}: ${nextQuestion.question}\n`,
          <br />,
          nextOptionsText,
        ]);
      } else {
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

  async function fetchAllQuestions() {
    await PanicApi.get("/getAllQuestions")
      .then((result) => {
        if (result.status === 200) {
          setQuestions(result.data);
          return;
        }
      }).catch((error) => {
        console.log(`Error: ${error}`);
        setError(error.message);
      });
  }

  async function fetchUserQuestionStatus() {
    await PanicApi.get("/getQuestionStatusByUserId")
      .then((result) => {
        if (result.status === 200) {
          setCurrentQuestionIndex(result.data.currentQuestion);
          return;
        }
      });
    return;
  }

  useEffect(() => {
    setIsLoading(true);
    const initialFunctions: Promise<void>[] = [];
    initialFunctions.push(fetchAllQuestions());
    initialFunctions.push(fetchUserQuestionStatus());
    Promise.all(initialFunctions).then(() => {
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="h-screen w-screen bg-[var(--primary-bg)]">
      <Terminal name={config.name} colorMode={ColorMode.Dark} onInput={handleInput}>
        {isLoading ? <TerminalLoading />
          : terminalLineData.map((line, index) => (
            <TerminalOutput key={index}>{line}</TerminalOutput>
          ))
        }
      </Terminal>
    </div>
  );
};

export default GamePage;
