import { type Request, type Response, Router } from "express";
import Controllers from "../../controllers";
import { validateData } from "../../middlewares/validationMiddleware";
import { createQuestionSchema, getQuestionByIdSchema } from "../../schemas";

export const questionRoutes = Router();

questionRoutes.post('/question/create', validateData(createQuestionSchema), (req: Request, res: Response) => void Controllers.createQuestion(req, res));
questionRoutes.get('/question/:id', validateData(getQuestionByIdSchema), (req: Request, res: Response) => void Controllers.getQuestionById(req, res));
questionRoutes.get('/getAllQuestions', (req: Request, res: Response) => void Controllers.getAllQuestions(req, res));
