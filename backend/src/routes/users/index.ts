import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { createUserSchema, getUserByIdSchema } from "@/schemas";

export const userRoutes = Router();

userRoutes.post('/user/create', validateData(createUserSchema), (req: Request, res: Response) => void Controllers.createUser(req, res));
userRoutes.get('/user/:id', validateData(getUserByIdSchema), (req: Request, res: Response) => void Controllers.getUserById(req, res));
