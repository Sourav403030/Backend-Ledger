import express from "express"
import { userLoginController, userRegisterController } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", userRegisterController);
authRouter.post("/login", userLoginController);