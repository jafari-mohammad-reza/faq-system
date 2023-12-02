import {config} from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import rateLimit from "express-rate-limit"
import {StatusCodes} from "http-status-codes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc"
import {initSwagger} from "./share/config/swagger-conf.js";
import {initMiddlewares} from "./share/config/middlewares-conf.js";
const nodeEnv =process.env.NODE_ENV
config({
    debug: nodeEnv === "dev",
})
async function initServer() {
    const port = process.env.PORT
    const app = express()

    app.disable('x-powered-by');
    initMiddlewares(app)
    initRoutes(app)
    initSwagger(app,port)
    app.listen( port,()=> {
        console.log(`Running on ${port}`)
    })
}

function initRoutes(app){}

initServer()
