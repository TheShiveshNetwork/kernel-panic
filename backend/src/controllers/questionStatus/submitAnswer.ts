import type { Request, Response } from "express";
import { questionStatusCollection, questionsCollection, userCollection } from "@/storage";
import type { ControllerClass } from "@/controllers";
import { ObjectId } from "mongodb";
import type { IAnswerSchema } from "@/schemas/questionStatus.schema";
import { config } from "@/config";

export async function submitAnswer(
  this: ControllerClass,
  request: Request,
  response: Response
) {
  const requestBody = request.body;
  const { userId, answeredQuestion } = requestBody;

  const questionStatus = await questionStatusCollection.findOne({ userId });
  if (questionStatus && questionStatus.answeredQuestions.some((question: any) => question.questionId === answeredQuestion.questionId)) {
    return response.status(400).json({ message: "Question already answered" });
  }

  const question = await questionsCollection.findOne({
    _id: new ObjectId(`${answeredQuestion.questionId}`),
  });

  if (!question) {
    return response.status(404).json({ message: "Question not found" });
  }

  const selectedOptionData = question.options[parseInt(answeredQuestion.selectedOption)];

  const isPathOption = config.pathOptions.find((option) => selectedOptionData.text === option);
  let selectedPath: string | null = null;
  if (isPathOption) {
    switch (selectedOptionData.text) {
      case config.pathOptions[0]:
        selectedPath = "mnc";
        break;
      case config.pathOptions[1]:
        selectedPath = "business";
        break;
      default:
        selectedPath = "studyabroad";
        break;
    }
  }

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
    // Not the best way to do this, but it works for now
    let updateSet:any = {
      name: existingUser.name,
      timestamp
    };
    if (selectedPath) {
      updateSet = { ...updateSet, selectedPath };
    }
    const result = await questionStatusCollection.updateOne(
      {
        userId: userId,
        "answeredQuestions.questionId": { $ne: answeredQuestion.questionId },
      },
      {
        $inc: {
          currentQuestion: 1,
          "totalPoints.health": totalHealthPoints,
          "totalPoints.wealth": totalWealthPoints,
          "totalPoints.happiness": totalHappinessPoints,
          accumulatedPoints: totalHappinessPoints + totalHealthPoints + totalWealthPoints,
        },
        $set: updateSet,
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

    if (existingQuestionStatus) {
      existingQuestionStatus.answeredQuestions.forEach((item: IAnswerSchema["body"]["answeredQuestions"][0]) => {
        totalHealthPoints += item.points.health || 0;
        totalWealthPoints += item.points.wealth || 0;
        totalHappinessPoints += item.points.happiness || 0;
      });
    }

    if (result.upsertedCount > 0) {
      return response.status(201).json({
        message: "Answers submitted successfully",
        totalPoints: {
          totalHappinessPoints,
          totalHealthPoints,
          totalWealthPoints,
        },
        questionPoints: { ...points }
      });
    } else if (result.modifiedCount > 0) {
      return response.status(200).json({
        message: "Answers updated successfully",
        totalPoints: {
          totalHappinessPoints,
          totalHealthPoints,
          totalWealthPoints,
        },
        questionPoints: { ...points }
      });
    }
    return response.status(400).json({ message: "An unhandled error occurred" });
  } catch (error) {
    console.error("An unhandled error occurred while submitting answer: ", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
