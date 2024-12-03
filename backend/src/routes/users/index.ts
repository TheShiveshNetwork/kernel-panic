import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { createUserSchema, getUserByIdSchema, loginUserSchema } from "@/schemas";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

export const userRoutes = Router();

userRoutes.post('/user/create', validateData(createUserSchema), async (req: Request, res: Response) => {
    await Controllers.createUser(req, res);
});
userRoutes.get('/getCurrentUser', authenticateToken, async (req, res) => {
    await Controllers.getCurrentUser(req, res);
});
userRoutes.post('/user/login', validateData(loginUserSchema), async (req: Request, res: Response) => {
    await Controllers.loginUser(req, res);
});
userRoutes.get('/user/:id', validateData(getUserByIdSchema), async (req: Request, res: Response) => {
    await Controllers.getUserById(req, res)
});
