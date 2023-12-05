import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import statusCodes, {StatusCodes} from "http-status-codes";
import createHttpError from "http-errors";
import {NODE_ENV} from "../constants/index.js";

export function initMiddlewares(app){
    app.use(morgan(NODE_ENV === "dev" ? "dev" : "combined"))
    app.use(helmet())
    app.use(cors({credentials: true}));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(rateLimit({
        windowMs: 60  * 1000, // 1 minute,
        max: 10,
        message: {
            statusCode: StatusCodes.TOO_MANY_REQUESTS,
            message: 'You can only send otp 2 times between 1 minute',
        },
    }))

}