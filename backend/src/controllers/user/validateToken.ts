import type { Request, Response } from "express";
import type { ControllerClass } from "..";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function tokenIsValid(this: ControllerClass, request: Request, response: Response) {
    const authHeader = request.headers["cookie"];
    if (!authHeader) {
        return response.status(401).json({ validToken: false, message: "Token is missing" });
    }
    const cookies = Object.fromEntries(
        authHeader.split("; ").map(cookie => cookie.split("="))
    );

    if (!cookies) {
        return response.status(401).json({ validToken: false, message: "Cookies are missing" });
    }

    try {
        const token = cookies["token"];
        const secretKey = process.env.SECRET_KEY || "";

        const decoded = jwt.verify(token, secretKey) as JwtPayload;

        if (typeof decoded != "object") {
            return response.status(403).json({ validToken: false, message: "Invalid token" });
        }

        if (!decoded.userId || !decoded.email) {
            return response.status(403).json({ validToken: false, message: "Invalid token" });
        }

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            return response.status(403).json({ validToken: false, message: "Invalid or expired token" });
        }
        
        return response.status(200).json({ validToken: true, message: "Token is valid" });
    } catch (error) {
        console.log("Invalid or expired token passed at authentication middleware");
        return response.status(403).json({ validToken: false, message: "Invalid or expired token" });
    }
}
