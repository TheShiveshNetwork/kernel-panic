import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { createQuestionSchema, getQuestionByIdSchema } from "@/schemas";

export const questionRoutes = Router();

questionRoutes.post('/question/create', validateData(createQuestionSchema), async (req: Request, res: Response) => {
    await Controllers.createQuestion(req, res);
});
questionRoutes.get('/question/:id', validateData(getQuestionByIdSchema), async (req: Request, res: Response) => {
    await Controllers.getQuestionById(req, res);
});
questionRoutes.get('/getAllQuestions', async (req: Request, res: Response) => {
    await Controllers.getAllQuestions(req, res);
});
