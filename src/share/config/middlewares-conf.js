import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import statusCodes, {StatusCodes} from "http-status-codes";
import createHttpError from "http-errors";

export function initMiddlewares(app){
    app.use(morgan(process.env.NODE_ENV === "dev" ? "dev" : "combined"))
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
    app.use((_req, _res, next) => {
        next(createHttpError(statusCodes.NOT_FOUND));
    });
    app.use((error, _req, res, _next) => {
        const serverError = createHttpError(statusCodes.INTERNAL_SERVER_ERROR);
        const statusCode = error.status || serverError.status;
        const message = error.message || serverError.message;
        return res.status(statusCode).json({
            statusCode,
            errors: {
                message,
            },
        });
    });
}