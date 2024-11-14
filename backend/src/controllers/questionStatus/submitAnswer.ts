import type { Request, Response } from "express";
import { questionStatusCollection } from "../../storage";
import type { ControllerClass } from "..";

export async function submitAnswer(this: ControllerClass, request:Request, response:Response) {
    const requestBody = request.body;
    // calculate total points internally
    let totalHealthPoints = 0;
    let totalWealthPoints = 0;
    let totalHappinessPoints = 0;
    requestBody.answeredQuestions.forEach((answer: typeof requestBody.answeredQuestions) => {
        totalHealthPoints += answer.points.healthPoints;
        totalWealthPoints += answer.points.wealthPoints;
        totalHappinessPoints += answer.points.happinessPoints;
    });
    // Save the answer to the database
    const result = await questionStatusCollection.insertOne({
        userId: requestBody.userId,
        answeredQuestions: requestBody.answeredQuestions,
        currentQuestion: requestBody.currentQuestion,
        points: {
            health: totalHealthPoints,
            wealth: totalWealthPoints,
            happiness: totalHappinessPoints,
        },
        accumulatedPoints: totalHappinessPoints + totalHealthPoints + totalWealthPoints,
    });
    // check if the answer was submitted successfully
    if (result.acknowledged) {
        console.log("New answer submitted successfully");
        return response.status(201).json({ message: "Answer submitted successfully" });
    }
    console.error("Error occured at submitAnswer: An unhandled error occured");
    return response.status(500).json({ message: "An unhandled error occured" });
}
