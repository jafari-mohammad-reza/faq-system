import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../constants/index.js";

export async function generateToken(payload, expiresIn = '1d') {
    return await jwt.sign({payload}, JWT_SECRET, {expiresIn});
}

export async function decodeToken(token) {
    return await jwt.decode(token, JWT_SECRET)
}
