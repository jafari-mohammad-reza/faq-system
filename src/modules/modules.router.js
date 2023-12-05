import {AuthRouter} from "./auth/auth.routes.js"
import {Router} from "express";
import {SectionRouter} from "./section/section.routes.js";

const mainRouter = Router();
mainRouter.use("/auth", AuthRouter);
mainRouter.use("/section", SectionRouter);
export default mainRouter