import type { Request, Response } from "express";
import type { ControllerClass } from "..";
import { userCollection } from "@/storage";
import { ObjectId } from "mongodb";

export async function getCurrentUser(this: ControllerClass, request:Request, response:Response) {
    const userId:string = request.params.userId;
    try {
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.status(200).json({
            message: "User retrieved successfully",
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("An error occurred while fetching user details: ", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}
