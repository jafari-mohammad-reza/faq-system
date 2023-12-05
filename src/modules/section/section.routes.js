import {Router} from "express";
import { RoleGuard} from "../../share/guards/index.js";
import SectionController from "./section.controller.js";

const router = Router()
router.get("/" ,  SectionController.findAll)
router.get("/:id" ,  SectionController.findOne)
router.post("/" ,  RoleGuard(["ADMIN"]) , SectionController.create)
router.patch("/:id" ,  RoleGuard(["ADMIN"]) , SectionController.update)
router.delete("/:id" ,  RoleGuard(["ADMIN"]) , SectionController.delete)
export {
    router as SectionRouter
}