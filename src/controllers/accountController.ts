import { Request, Response } from "express";
import { accountModel } from "../models/accountModel";

export default async function createAccountController (req: Request, res: Response){

    const user = req.user;

    const account = await accountModel.create({
        user: user._id,
    })

    res.status(201).json({
        message: "Account created successfully",
        account
    })
}