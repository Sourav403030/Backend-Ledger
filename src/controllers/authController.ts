import { Request, Response } from "express";
import { userLoginSchema, userModel, userRegisterSchema } from "../models/userModel";
import jwt from "jsonwebtoken";
import sendRegistrationEmail from "../services/emailService";

export async function userRegisterController(req: Request, res: Response){
    const {name, email, password} = req.body

    const validationResult = userRegisterSchema.safeParse(req.body);

    if(!validationResult.success){
        return res.status(400).json({
            message: "All the required fields need to be filled"
        })
    }

    const isUserExist = await userModel.findOne({email})

    if(isUserExist){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const newUser = await userModel.create({
        name,
        email,
        password
    })

    await newUser.save();

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        }
    })

    await sendRegistrationEmail(newUser.email, newUser.name);
}

export async function userLoginController(req: Request, res: Response){
    const {email, password} = req.body;

    const validationResult = userLoginSchema.safeParse(req.body);

    if(!validationResult.success){
        return res.status(401).json({
            message: "All the required fields need to be filled"
        })
    }

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(401).json({
            message: "User not found"
        })
    }

    const isPasswordMatching = await user.comparePassword(password);

    if(!isPasswordMatching){
        return res.status(401).json({
            message: "Email or Password is Invalid"
        })
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        return res.status(400).json({
            message: "Jwt secret is required"
        })
    }

    const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1d"});

    res.cookie("token", token);

    res.status(200).json({
        message: "User LoggedIn successfully",
        token,
    })

}