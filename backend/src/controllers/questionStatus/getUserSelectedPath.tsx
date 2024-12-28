import type { Request, Response } from "express";
import type { ControllerClass } from "@/controllers";
import { questionStatusCollection } from "@/storage";

export async function getUserSelectedPath(this: ControllerClass, request: Request, response: Response) {
    try {
        const questionStatus = await questionStatusCollection.findOne({ userId: request.body.userId });
        if (!questionStatus) {
            return response.status(404).json({ message: "Answer the initial questions first" });
        }
        return response.status(200).json({ selectedPath: questionStatus.selectedPath });
    } catch (error) {
        console.error(`Error occured at getAllQuestions: ${error}`);
        return response.status(500).json({ message: "An unhandled error occured" });
    }
}
