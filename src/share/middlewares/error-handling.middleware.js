import createHttpError from "http-errors";
import statusCodes from "http-status-codes";

export function errorHandlingMiddleware(error, req, res, _nex) {
    if (error.isJoi) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.details[0].message
        });
    }

    // Handle other types of errors
    const serverError = createHttpError(statusCodes.INTERNAL_SERVER_ERROR);
    const statusCode = error.status || serverError.status;
    const message = error.message || serverError.message;

    return res.status(statusCode).json({
        statusCode,
        success: false,
        message
    });
}

export function notFoundMiddleware(req, re, next) {
    next(createHttpError(statusCodes.NOT_FOUND));
}