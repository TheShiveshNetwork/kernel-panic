import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["cookie"];
    if (!authHeader) {
        res.status(401).json({ message: "Token is missing" });
        return;
    }
    const cookies = Object.fromEntries(
        authHeader.split("; ").map(cookie => cookie.split("="))
    );

    if (!cookies) {
        res.status(401).json({ message: "Access token is missing" });
        return;
    }

    try {
        const token = cookies["token"];
        const secretKey = process.env.SECRET_KEY || "";

        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        if (typeof decoded !== "object") {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        if (!decoded.userId || !decoded.email) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            console.log("exp: ", decoded.exp * 1000);
            console.log("now: ", Date.now());
            console.log("Token is expired");
            return;
        }

        req.body.userId = decoded.userId.toString();
        next();
    } catch (error) {
        console.log("Invalid or expired token passed at authentication middleware");
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
