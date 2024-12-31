import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { createQuestionSchema, getQuestionByIdSchema } from "@/schemas";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

export const questionRoutes = Router();

questionRoutes.post('/question/create', validateData(createQuestionSchema), async (req: Request, res: Response) => {
    await Controllers.createQuestion(req, res);
});
questionRoutes.get('/question/:id', authenticateToken, validateData(getQuestionByIdSchema), async (req: Request, res: Response) => {
    await Controllers.getQuestionById(req, res);
});
questionRoutes.get('/getAllQuestions', authenticateToken, async (req: Request, res: Response) => {
    await Controllers.getAllQuestions(req, res);
});
questionRoutes.get('/getQuestions', authenticateToken, async (req: Request, res: Response) => {
    await Controllers.getQuestions(req, res);
});
