import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { getQuestionStatusByUserIdSchema, submitAnswerRequestSchema } from "@/schemas";

export const questionStatusRoutes = Router();

questionStatusRoutes.post('/submitAnswer', validateData(submitAnswerRequestSchema), (req: Request, res: Response) => void Controllers.submitAnswer(req, res));
questionStatusRoutes.get('/getQuestionStatusByUserId/:id', validateData(getQuestionStatusByUserIdSchema), (req: Request, res: Response) => void Controllers.getQuestionStatusByUserId(req, res));
