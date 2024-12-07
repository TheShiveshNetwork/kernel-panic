import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }).strict(),
});

export const getUserByIdSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
