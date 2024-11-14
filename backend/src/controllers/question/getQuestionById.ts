import type { Request, Response } from "express";
import type { ControllerClass } from "@/controllers";
import { questionsCollection } from "@/storage";
import { ObjectId } from "mongodb";

export async function getQuestionById(this: ControllerClass, request:Request, response:Response) {
    const { id } = request.params;
    try {
        const question = await questionsCollection.findOne({ _id: new ObjectId(id) });
        if (!question) {
            return response.status(404).json({ message: "Question not found" });
        }
        return response.status(201).json(question);
    } catch (error) {
        console.error(`Error occured at getQuestionById: ${error}`);
        return response.status(500).json({ message: "An unhandled error occured" });
    }
}
