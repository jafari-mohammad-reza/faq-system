import {config} from "dotenv"

config()
export const MYSQL_CONNECTION_URL = process.env.MYSQL_CONNECTION_URL
export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV

export const JWT_SECRET = process.env.JWT_SECRET