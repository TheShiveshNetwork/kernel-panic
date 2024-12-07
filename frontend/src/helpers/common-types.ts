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
    title: string;
    options: Option[];
}
