import {config} from "dotenv";
import express from "express";
import {initSwagger} from "./share/config/swagger-conf.js";
import {initMiddlewares} from "./share/config/middlewares-conf.js";
import {connectDb} from "./share/db/db.js";
const nodeEnv =process.env.NODE_ENV
config({
    debug: nodeEnv === "dev",
})
async function initServer() {
    const port = process.env.PORT
    const app = express()
    connectDb()
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
