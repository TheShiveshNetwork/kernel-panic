import type { Request, Response } from "express";
import { MongoDBClient } from "@/db";
import { createUser } from "./user/createUser";
import { loginUser } from "./user/loginUser";
import { getUserById } from "./user/getUserById";
import { createQuestion } from "./question/createQuestion";
import { getQuestionById } from "./question/getQuestionById";
import { getAllQuestions } from "./question/getAllQuestions";
import { submitAnswer } from "./questionStatus/submitAnswer";
import { getQuestionStatusByUserId } from "./questionStatus/getQuestionStatusByUserId";
import { getCurrentUser } from "./user/getCurrentUser";
import { logoutUser } from "./user/logout";
import { tokenIsValid } from "./user/validateToken";

export class ControllerClass {
    private mongoClient = new MongoDBClient;

    constructor() {
        // Do something
        this.mongoClient.init();
    }

    async ping(request:Request, response:Response) {
        return response.status(201).json({ message: "Server running" });
    }

    createUser = createUser;
    loginUser = loginUser;
    getUserById = getUserById;
    createQuestion = createQuestion;
    getQuestionById = getQuestionById;
    getAllQuestions = getAllQuestions;
    submitAnswer = submitAnswer;
    getQuestionStatusByUserId = getQuestionStatusByUserId;
    getCurrentUser = getCurrentUser;
    logoutUser = logoutUser;
    tokenIsValid = tokenIsValid;
}

let Controllers = new ControllerClass();
export default Controllers;