import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { submitAnswerRequestSchema } from "@/schemas";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

export const questionStatusRoutes = Router();

questionStatusRoutes.post('/submitAnswer', validateData(submitAnswerRequestSchema), async (req: Request, res: Response) => {
    await Controllers.submitAnswer(req, res);
});
questionStatusRoutes.get('/getQuestionStatusByUserId', authenticateToken, async (req: Request, res: Response) => {
    await Controllers.getQuestionStatusByUserId(req, res);
});
