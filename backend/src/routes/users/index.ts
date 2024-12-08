import { type Request, type Response, Router } from "express";
import Controllers from "@/controllers";
import { validateData } from "@/middlewares/validationMiddleware";
import { createUserSchema, getUserByIdSchema, loginUserSchema } from "@/schemas";
import { authenticateToken } from "@/middlewares/authenticationMiddleware";

export const userRoutes = Router();

userRoutes.get("/token-is-valid", async (req: Request, res: Response) => {
    await Controllers.tokenIsValid(req, res);
});
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
userRoutes.get('/logout', authenticateToken, async (req: Request, res: Response) => {
    await Controllers.logoutUser(req, res);
});
