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
import { getInitialQuestions } from "./question/getInitialQuestions";
import { getQuestions } from "./question/getQuestions";
import { getUserSelectedPath } from "./questionStatus/getUserSelectedPath";

export class ControllerClass {
    private mongoClient = new MongoDBClient;

    constructor() {
        // Do something
        this.mongoClient.init();
    }

    async ping(request:Request, response:Response) {
        return response.status(201).json({ message: "Server running" });
    }

    loginUser = loginUser;
    logoutUser = logoutUser;
    createUser = createUser;
    getUserById = getUserById;
    tokenIsValid = tokenIsValid;
    getCurrentUser = getCurrentUser;
    createQuestion = createQuestion;
    getQuestionById = getQuestionById;
    getAllQuestions = getAllQuestions;
    getQuestions = getQuestions;
    getInitialQuestions = getInitialQuestions;
    getUserSelectedPath = getUserSelectedPath;
    getQuestionStatusByUserId = getQuestionStatusByUserId;
    submitAnswer = submitAnswer;
}

let Controllers = new ControllerClass();
export default Controllers;