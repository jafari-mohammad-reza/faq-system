import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import {BaseRepository} from "../db/base.repository.js";

const roleRepo = new BaseRepository("Role")

export function RoleGuard(roles) {
    return async function (req, res, next) {
        try {
            const {id,roles : userRoles} = req.user;
            if (!id) {
                throw createHttpError(statusCodes.UNAUTHORIZED);
            }
            const targetRoles = await roleRepo.findAllBy("Title", roles);
            const userRoleIds = userRoles.map(role => role.RoleID);
            const targetRoleIds = targetRoles.map(role => role.ID);
            const hasRequiredRole = userRoleIds.some(roleId => targetRoleIds.includes(roleId));
            if (!hasRequiredRole) {
                throw createHttpError(statusCodes.FORBIDDEN, 'Insufficient permissions');
            }
            next();
        } catch (err) {
            next(err);
        }
    };
}
