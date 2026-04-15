    import type { Request, Response, NextFunction } from "express";
    import jwt from "jsonwebtoken";
    import { SECRET } from ".";
    import type { Payload } from "./types";

    interface AuthRequest extends Request {
        user? : Payload
    }

    export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
         const header = req.headers.authorization as string;

        if (!header) {
            return res.status(403).json({
                message: "no token"
            })
        }

            const token = header.split(" ")[1];


        try {
        const payload = jwt.verify(token!, SECRET) as Payload;

            req.user = {
                userId : payload.userId,
                username : payload.username
            }

            next();

        } catch {
            res.status(403).json({
                message : "FORBIDDEN"
            })
        }

    }