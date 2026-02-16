import express from "express"
import authMiddleware from "../middlewares/authMiddleware";
import createAccountController from "../controllers/accountController";


export const accountRouter = express.Router();

accountRouter.get("/", authMiddleware, createAccountController);