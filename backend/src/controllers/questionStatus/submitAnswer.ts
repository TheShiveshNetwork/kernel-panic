import type { Request, Response } from "express";
import { questionStatusCollection, questionsCollection } from "@/storage";
import type { ControllerClass } from "@/controllers";
import { ObjectId } from "mongodb";

export async function submitAnswer(
  this: ControllerClass,
  request: Request,
  response: Response
) {
  const requestBody = request.body;
  const { userId, currentQuestion, answeredQuestion } = requestBody;
  const { questionId, selectedOption } = answeredQuestion;

  const question = await questionsCollection.findOne({
    _id: new ObjectId(questionId),
  });

  if (!question) {
    return response.status(404).json({ message: "Question not found" });
  }

  const selectedOptionData = question.options[parseInt(selectedOption)];

  if (!selectedOptionData) {
    return response.status(400).json({ message: "Invalid option selected" });
  }

  const points = selectedOptionData.points;

  const existingUser = await questionStatusCollection.findOne({ userId });

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  if (existingUser) {
    const updatedAnsweredQuestions = [
      ...existingUser.answeredQuestions,
      answeredQuestion,
    ];

    let totalHealthPoints = 0;
    let totalWealthPoints = 0;
    let totalHappinessPoints = 0;

    updatedAnsweredQuestions.forEach((answer) => {
      const { points } = answer;
      if (points !== undefined) {
        totalHealthPoints += points.health || 0;
        totalWealthPoints += points.wealth || 0;
        totalHappinessPoints += points.happiness || 0;
      }
    });

    const accumulatedPoints =
      totalHealthPoints + totalWealthPoints + totalHappinessPoints;

    const result = await questionStatusCollection.updateOne(
      { userId },
      {
        $set: {
          currentQuestion: updatedAnsweredQuestions.length + 1,
          points: {
            health: totalHealthPoints,
            wealth: totalWealthPoints,
            happiness: totalHappinessPoints,
          },
          accumulatedPoints,
          timestamp, 
        },
        $push: {
          answeredQuestions: {
            ...answeredQuestion,
            points,
            timestamp, 
          },
        },
      }
    );

    if (result.modifiedCount > 0) {
      const nextQuestionNumber = updatedAnsweredQuestions.length + 1;
      return response.status(200).json({
        message: "Answer updated successfully",
        nextQuestion: nextQuestionNumber,
      });
    } else {
      return response
        .status(500)
        .json({ message: "An error occurred while updating the answer" });
    }
  } else {
    const result = await questionStatusCollection.insertOne({
      userId,
      answeredQuestions: [
        {
          ...answeredQuestion,
          points,
          timestamp, 
        },
      ],
      currentQuestion: 2,
      points,
      accumulatedPoints: points.health + points.wealth + points.happiness,
      timestamp, 
    });

    if (result.acknowledged) {
      return response
        .status(201)
        .json({ message: "Answer submitted successfully", nextQuestion: 2 });
    } else {
      return response.status(500).json({ message: "An error occurred" });
    }
  }
}
