import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import {BaseRepository} from "../db/base.repository.js";


export function RoleGuard(roles) {
    return async function (req, res, next) {
        try {
            const {id,roles : userRoles} = req.user;
            if (!id) {
                throw createHttpError(statusCodes.UNAUTHORIZED);
            }
            const hasRequiredRole = userRoles.some(role => roles.includes(role));
            if (!hasRequiredRole) {
                throw createHttpError(statusCodes.FORBIDDEN, 'Insufficient permissions');
            }
            next();
        } catch (err) {
            next(err);
        }
    };
}
