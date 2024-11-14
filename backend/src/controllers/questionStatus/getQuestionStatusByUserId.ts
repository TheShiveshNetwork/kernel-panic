import type { Request, Response } from "express";
import type { ControllerClass } from "@/controllers";
import { questionStatusCollection } from "@/storage";

export async function getQuestionStatusByUserId(this: ControllerClass, request: Request, response: Response) {
    const { id } = request.params;
    try {
        const questionStatus = await questionStatusCollection.findOne({ userId: id });
        if (!questionStatus) {
            return response.status(404).json({ message: "No answers submitted by user" });
        }
        return response.status(200).json(questionStatus);
    } catch (error) {
        console.error(`Error occured at getQuestionStatusByUserId: ${error}`);
        return response.status(500).json({ message: "An unhandled error occured" });
    }
}
