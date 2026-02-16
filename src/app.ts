import express from "express"
import { authRouter } from "./routes/authRoutes";
import cookieParser from "cookie-parser"
import { accountRouter } from "./routes/accountRoutes";

export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

