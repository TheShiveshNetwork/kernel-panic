import { ITerminalLineData, Question } from "@/common-types";
import { PanicApi } from "@/api";
import { TerminalColorText } from "@/components/commons/TerminalColorText";
import { TerminalError } from "@/components/commons/TerminalError";
import { config } from "@/config";
import { FormatImageToAscii } from "@/utils";

export type ISetTerminalData = React.Dispatch<React.SetStateAction<ITerminalLineData>>;

export function helpCommandHandler(setTerminalLineData: ISetTerminalData) {
    const helpText = [
        <TerminalColorText color="white">
            Here is a list of all the available commands:
        </TerminalColorText>,
        <div className="flex flex-col gap-2 max-w-[600px]">  {/* Parent flex container */}
            {Object.values(config.commonCommands).map((command) => (
                <div key={command.name} className="w-full flex justify-between items-center text-white">
                    <TerminalColorText color="blue" className="w-1/2">{command.name}</TerminalColorText>
                    <span>-</span>
                    <TerminalColorText color="white" className="w-full text-left ml-4">{command.description}</TerminalColorText>
                </div>
            ))}
        </div>
    ];
    setTerminalLineData((prevData) => [...prevData, ...helpText, <br />]);
    return;
};

export function startGameCommandHandler(startGame: () => void) {
    startGame();
    return;
};

export function continueGameCommandHandler(setTerminalLineData: ISetTerminalData, currentIndex: number | null, questions: Question[]) {
    if (currentIndex === null) {
        setTerminalLineData((prevData) => [
            ...prevData,
            "Game hasn't started yet. Type 'start' to begin the game.",
        ]);
        return;
    }
    const currentQuestion = questions[currentIndex];
    const optionsText = currentQuestion.options
        .map((option, index) => `${index + 1}. ${option.text}`)
        .join("\n");

    setTerminalLineData((prevData) => [
        ...prevData,
        <br />,
        <TerminalColorText color="blue">
        You are continuing from Question {currentIndex + 1}
        </TerminalColorText>,
        <br />,
        <div className="whitespace-pre-wrap">{FormatImageToAscii(currentQuestion.image)}</div>,
        `\nQuestion ${(currentIndex) +1}: ${currentQuestion.question}\n`,
        <br />,
        optionsText,
    ]);
    return;
};

export function describeCommandHandler(setTerminalLineData: ISetTerminalData) {
    setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalColorText color="blue">{config.asciiLogo}</TerminalColorText>,
        <TerminalColorText color="blue" className="flex max-w-[600px] justify-between">
            {config.name}
            <a href={config.githubLink} target="_blank" className="underline">View on GitHub</a>
        </TerminalColorText>,
        <TerminalColorText color="white">{config.description}</TerminalColorText>,
        <TerminalColorText color="white">
            <a href={config.teamLink} target="_blank" className="underline">View Team</a>
        </TerminalColorText>,
        <br />,
    ]);
    return;
};

export async function whoamiCommandHandler(setTerminalLineData: ISetTerminalData) {
    await PanicApi.get("/getCurrentUser")
        .then((response) => {
            setTerminalLineData((prevData) => [
                ...prevData,
                <TerminalColorText color="blue">You are currently logged in as: {response.data.data.name}</TerminalColorText>,
                <br />
            ]);
        })
        .catch((error) => {
            setTerminalLineData((prevData) => [
                ...prevData,
                <TerminalError>Error: {error.message}</TerminalError>,
                <br />
            ]);
        });
    return;
}

export function logoutCommandHandler(setTerminalLineData: ISetTerminalData) {
    setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalColorText color="blue">Logging you out...</TerminalColorText>,
    ]);
    return;
}
