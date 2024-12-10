import type { IPointsSchema, ITerminalLineData } from "@/common-types";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { toast } from 'react-toastify';
import { PanicApi } from "@/api";
import { config } from "@/config";
import { TerminalError } from "@/components/commons/TerminalError";
import { TerminalColorText } from "@/components/commons/TerminalColorText";
import { useAuth } from "@/hooks/use-auth";
import { Question } from "@/common-types";
import { FormatImageToAscii, renderStats } from "@/utils";
import TerminalLoading from "@/components/terminal-loader";
import { scrollToBottom } from "@/utils/scroll-to-bottom";

type ISubmitAnswerResponse = { 
  success: true; 
  stats: IPointsSchema;
} | {
  success: false;
};

const GamePage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [terminalLineData, setTerminalLineData] = useState<ITerminalLineData>([
    "Welcome to",
    `${config.asciiName}\n`,
    // `${config.asciiLogo}\n`,
    `Type '${config.commonCommands.helpCommand.name}' to see all available commands.\n`,
    `Type '${config.commonCommands.startCommand.name}' to start the game.\n\n`,
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  // const [stats, setStats] = useState<IPointsSchema>({
  //   health: 0,
  //   wealth: 0,
  //   happiness: 0,
  // });
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
        <TerminalColorText color="white">Type '{config.commonCommands.continueCommand.name}' to continue the game.</TerminalColorText>,
        <br />,
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
      `\nQuestion ${(currentQuestionIndex || 0) + 1}: ${currentQuestion.question}\n`,
      <br />,
      optionsText,
    ]);
  };

  async function submitAnswer(questionId: string, selectedOption: string): Promise<ISubmitAnswerResponse> {
    try {
      const response = await PanicApi.post("/submitAnswer", {
        answeredQuestion: {
          questionId,
          selectedOption,
        },
      });

      if (response.status === 201 || response.status === 200) {
        const stats: IPointsSchema = {
          health: response.data.totalPoints.totalHealthPoints,
          wealth: response.data.totalPoints.totalWealthPoints,
          happiness: response.data.totalPoints.totalHappinessPoints,
        };
        toast.success(`Congrats! You earned: 
          health: ${response.data.questionPoints.health}, 
          wealth: ${response.data.questionPoints.wealth}, 
          happiness: ${response.data.questionPoints.happiness},
        `);
        return { success: true, stats };
      } else {
        toast.error(response.data.message || "Failed to submit answer.");
        return { success: false };
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
      return { success: false };
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
      const { success, message } = await logout();
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      navigate("/");
      return;
    }

    if (input === config.commonCommands.leaderboardCommand.name) {
      navigate("/leaderboard");
      return;
    }

    if (currentQuestionIndex === null || currentQuestionIndex > questions.length) {
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalError>Invalid command. Type '{config.commonCommands.helpCommand.name}' to see all available commands.</TerminalError>
      ]);
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOptionIndex = parseInt(input) - 1;

    if (isNaN(selectedOptionIndex) || selectedOptionIndex < 0 || selectedOptionIndex >= currentQuestion.options.length) {
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalError>Invalid command. Type '{config.commonCommands.helpCommand.name}' to see all available commands.</TerminalError>,
      ]);
      return;
    }

    const selectedOption = currentQuestion.options[selectedOptionIndex];

    const submitAnswerResponse = await submitAnswer(currentQuestion._id, selectedOptionIndex.toString());

    if (submitAnswerResponse.success) {
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
          <TerminalColorText color="blue">
            Total points:
            <div className="whitespace-pre-wrap">{renderStats(submitAnswerResponse.stats)}</div>
          </TerminalColorText>,
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
          <TerminalColorText color="blue">
            Final stats
            <div className="whitespace-pre-wrap">{renderStats(submitAnswerResponse.stats)}</div>
          </TerminalColorText>,
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
    scrollToBottom();
  }, [setTerminalLineData]);

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
