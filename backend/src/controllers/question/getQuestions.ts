import type { Request, Response } from "express";
import type { ControllerClass } from "@/controllers";
import { questionsCollection } from "@/storage";

export async function getQuestions(this: ControllerClass, request:Request, response:Response) {
    const { type } = request.query;
    try {
        const questions = await questionsCollection.find({ type: type }, { projection: { "options.points": 0 } }).sort({ index: 1 }).toArray();
        return response.status(200).json(questions);
    } catch (error) {
        console.error(`Error occured at getAllQuestions: ${error}`);
        return response.status(500).json({ message: "An unhandled error occured" });
    }
}
