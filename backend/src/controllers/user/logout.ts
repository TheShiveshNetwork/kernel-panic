import type { Request, Response } from "express";

export async function logoutUser(request: Request, response: Response) {
    response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return response.status(200).json({ message: "Logged out successfully" });
}
