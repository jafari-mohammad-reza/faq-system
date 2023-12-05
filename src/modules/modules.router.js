import {AuthRouter} from "./auth/auth.routes.js"
import {Router} from "express";

const mainRouter = Router();
mainRouter.use("/auth", AuthRouter);
export default mainRouter