import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { ControllerClass } from "@/controllers";
import { userCollection } from "@/storage/index.js";
import jwt from "jsonwebtoken";

export async function loginUser(this: ControllerClass, request:Request, response:Response) {
    const { email, password } = request.body;
    try {
        const user = await userCollection.findOne({ email });
        if (!user) {
            console.log("Error during login: User not found");
            return response.status(404).json({ message: "User not found" });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            console.log("Error during login: Incorrect password");
            return response.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.SECRET_KEY || "1234!@#%<{*&)",
            { expiresIn: "1h" }
        );
        return response.status(201).json({ message: "Logged in user successfully", token });
    } catch (error) {
        console.error("An error occurred while logging in user: ", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}