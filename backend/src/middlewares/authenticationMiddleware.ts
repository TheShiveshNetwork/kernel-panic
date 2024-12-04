import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["cookie"];
    if (!authHeader) {
        res.status(401).json({ message: "Access token is missing" });
        return;
    }
    const cookie = authHeader.split("=")[1];

    if (!cookie) {
        res.status(401).json({ message: "Access token is missing" });
        return;
    }

    try {
        const secretKey = process.env.SECRET_KEY || "";

        const decoded = jwt.verify(cookie, secretKey);
        if (typeof decoded !== "object") {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        if (!decoded || !decoded.userId) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        req.body.userId = decoded.userId.toString();
        next();
    } catch (error) {
        console.log("Invalid or expired token passed at authentication middleware");
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
