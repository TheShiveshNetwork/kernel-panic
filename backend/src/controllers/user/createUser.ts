import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { ControllerClass } from "@/controllers";
import { userCollection } from "@/storage/index.js";

export async function createUser(this: ControllerClass, request:Request, response:Response) {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = !!(await userCollection.findOne({ email }));
    if (userExists) {
        console.error("Error occured at createUser: email already exists");
        return response.status(409).json({ message: "Email already exists" });
    }
    // Save the user to the database
    const user = await userCollection.insertOne({ email, password: hashedPassword });
    if (user.acknowledged) {
        console.log("New user created successfully");
        return response.status(201).json({ message: "User created successfully" });
    }
    console.error("Error occured at createUser: An unhandled error occured");
    return response.status(500).json({ message: "An unhandled error occured" });
}