import type { Request, Response } from "express";
import type { ControllerClass } from "..";
import { userCollection } from "@/storage";
import { ObjectId } from "mongodb";

export async function getUserById(this: ControllerClass, request:Request, response:Response) {
    const userId:string = request.body.userId;
    try {
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.status(201).json(user);
    } catch (error) {
        console.error(`Error occured at getUserById: ${error}`);
        return response.status(500).json({ message: "An unhandled error occured" });
    }
}
