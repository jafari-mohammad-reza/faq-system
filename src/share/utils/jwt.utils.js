import jwt from 'jsonwebtoken'
import {JWT_TOKEN} from "../constants/index.js";

export async function generateToken(payload, expiresIn = '1d') {
    return await jwt.sign({payload}, JWT_TOKEN, {expiresIn});
}

export async function decodeToken(token) {
    return await jwt.decode(token, JWT_TOKEN)
}
