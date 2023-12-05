import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import {decodeToken} from "../utils/jwt.utils.js";
import {BaseRepository} from "../db/base.repository.js";

const userRepo = new BaseRepository("User")

export async function AuthorizationGuard(req, res, next) {
    try {
        const {authorization} = req.headers;
        if (!authorization) {
            throw createHttpError(statusCodes.UNAUTHORIZED)
        }
        const [bearer, token] = authorization?.split(' ') || [];
        if (!token || !['Bearer', 'bearer'].includes(bearer)) {
            throw createHttpError(statusCodes.UNAUTHORIZED)
        }
        const {payload, exp} = await decodeToken(token)
        if (exp < Math.floor(Date.now() / 1000)) {
            throw createHttpError(statusCodes.UNAUTHORIZED)
        }
        const user = await userRepo.findOneBy("Username", payload, "User")
        if (!user) {
            throw createHttpError(statusCodes.UNAUTHORIZED)
        }
        req.user = user.ID
        next()
    } catch (err) {
        next(err)
    }
}