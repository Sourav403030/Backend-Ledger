import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access, no token found"
        })
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        return res.status(401).json({
            message: "JWT Secret is required"
        })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if(!decoded){
        return res.status(401).json({
            message: "Unauthorized access, invalid token",
        })
    }

    const user = await userModel.findById(decoded.id).select("-password");

    req.user = user;

    next();

}