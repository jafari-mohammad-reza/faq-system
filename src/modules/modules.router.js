import {AuthRouter} from "./auth/auth.routes.js"
import {Router} from "express";
import {SectionRouter} from "./section/section.routes.js";
import {AuthorizationGuard} from "../share/guards/index.js";

const mainRouter = Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/section" , AuthorizationGuard, SectionRouter);
export default mainRouter