import {config} from "dotenv";
import express from "express";
import {initSwagger} from "./share/config/swagger-conf.js";
import {initMiddlewares} from "./share/config/middlewares-conf.js";
import {connectDb} from "./share/db/db.js";
import mainRouter from "./modules/modules.router.js";
import {NODE_ENV, PORT} from "./share/constants/index.js";
import {errorHandlingMiddleware, notFoundMiddleware} from "./share/middlewares/error-handling.middleware.js";

const nodeEnv = NODE_ENV
config({
    debug: nodeEnv === "dev",
})

async function initServer() {
    const port = PORT
    const app = express()
    await connectDb()
    app.disable('x-powered-by');
    initMiddlewares(app)
    app.use(mainRouter)
    initSwagger(app, port)
    app.use(notFoundMiddleware)
    app.use(errorHandlingMiddleware)
    app.listen(port, () => {
        console.log(`Running on ${port}`)
    })
}


initServer()
