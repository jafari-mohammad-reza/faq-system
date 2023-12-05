import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import {BaseRepository} from "../db/base.repository.js";

const userRoleRepo = new BaseRepository("UserRole")
const roleRepo = new BaseRepository("Role")

export function RoleGuard(roles) {
    return async function (req, res, next) {
        try {
            const userId = req.user;
            if (!userId) {
                throw createHttpError(statusCodes.UNAUTHORIZED);
            }

            // Fetch roles associated with the user
            const userRoles = await userRoleRepo.findAllBy("UserId", userId);
            if (!userRoles || userRoles.length === 0) {
                throw createHttpError(statusCodes.UNAUTHORIZED);
            }

            // Fetch target roles by their titles
            const targetRoles = await roleRepo.findAllBy("Title", roles);

            // Extract the RoleIDs from userRoles and IDs from targetRoles
            const userRoleIds = userRoles.map(role => role.RoleID);
            const targetRoleIds = targetRoles.map(role => role.ID);

            // Check if user has at least one of the required roles
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
