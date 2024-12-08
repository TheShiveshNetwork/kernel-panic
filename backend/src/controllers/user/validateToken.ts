import type { Request, Response } from "express";
import type { ControllerClass } from "..";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function tokenIsValid(this: ControllerClass, request: Request, response: Response) {
    const authHeader = request.headers["cookie"];
    if (!authHeader) {
        return response.status(401).json({ validToken: false, message: "Token is missing" });
    }
    const cookie = authHeader.split("=")[1];

    if (!cookie) {
        return response.status(401).json({ validToken: false, message: "Access token is missing" });
    }

    try {
        const secretKey = process.env.SECRET_KEY || "";

        const decoded = jwt.verify(cookie, secretKey) as JwtPayload;

        if (typeof decoded !== "object") {
            return response.status(403).json({ validToken: false, message: "Invalid token" });
        }

        if (!decoded || !decoded.userId) {
            return response.status(403).json({ validToken: false, message: "Invalid token" });
        }

        if (decoded.exp && decoded.exp < Date.now())
            return response.status(200).json({ validToken: true, message: "Token is valid" });
        
        return response.status(403).json({ validToken: false, message: "Invalid or expired token" });
    } catch (error) {
        console.log("Invalid or expired token passed at authentication middleware");
        return response.status(403).json({ validToken: false, message: "Invalid or expired token" });
    }
}
