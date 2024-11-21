import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export type IUserSchema = z.infer<typeof userSchema>;
