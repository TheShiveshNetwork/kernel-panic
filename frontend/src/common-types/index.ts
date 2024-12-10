export type IPointsSchema = {
    health: number;
    wealth: number;
    happiness: number;
};

export type ITerminalLineData = (string | JSX.Element)[];

type Option = {
    text: string;
    points: {
        health: number;
        wealth: number;
        happiness: number;
    };
}

export type Question = {
    _id: string;
    index: number;
    image: string;
    question: string;
    options: Option[];
}
