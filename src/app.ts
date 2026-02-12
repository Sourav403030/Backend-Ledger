import express from "express"
import { authRouter } from "./routes/authRoutes";
import cookieParser from "cookie-parser"

export const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);

