import type { Request, Response } from "express";
import { questionStatusCollection, questionsCollection, userCollection } from "@/storage";
import type { ControllerClass } from "@/controllers";
import { ObjectId } from "mongodb";

export async function submitAnswer(
  this: ControllerClass,
  request: Request,
  response: Response
) {
  const requestBody = request.body;
  const { userId, answeredQuestion } = requestBody;

  const question = await questionsCollection.findOne({
    _id: new ObjectId(`${answeredQuestion.questionId}`),
  });

  if (!question) {
    return response.status(404).json({ message: "Question not found" });
  }

  const selectedOptionData = question.options[parseInt(answeredQuestion.selectedOption)];

  const points = selectedOptionData.points;

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  let totalHealthPoints = points.health, totalWealthPoints = points.wealth, totalHappinessPoints = points.happiness;

  try {
    const existingUser = await userCollection.findOne({ _id: new ObjectId(`${userId}`) });
    if (!existingUser) {
      return response.status(404).json({ message: "User not found" });
    }
    const existingQuestionStatus = await questionStatusCollection.findOne({ userId });
    if (
      existingQuestionStatus && 
      existingQuestionStatus.answeredQuestions.some((question: any) => question.questionId === answeredQuestion.questionId)
    ) {
      return response.status(400).json({ error: "Question already answered" });
    }
    const result = await questionStatusCollection.updateOne(
      {
        userId: userId,
        "answeredQuestions.questionId": { $ne: answeredQuestion.questionId },
      },
      {
        $inc: {
          currentQuestion: 1,
          "points.health": totalHealthPoints,
          "points.wealth": totalWealthPoints,
          "points.happiness": totalHappinessPoints,
          accumulatedPoints: totalHappinessPoints + totalHealthPoints + totalWealthPoints,
        },
        $set: {
          name: existingUser.name,
          timestamp,
        },
        $push: {
          answeredQuestions: {
            ...answeredQuestion,
            points,
            timestamp,
          }
        }
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      return response.status(201).json({
        message: "Answers submitted successfully",
      });
    } else if (result.modifiedCount > 0) {
      return response.status(200).json({
        message: "Answers updated successfully",
      });
    }
    return response.status(400).json({ message: "An unhandled error occurred" });
  } catch (error) {
    console.error("An unhandled error occurred while submitting answer: ", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
