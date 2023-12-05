import {Router} from "express";
import {AuthorizationGuard, RoleGuard} from "../../share/guards/index.js";
import SectionController from "./section.controller.js";

const router = Router()
router.get("/" , SectionController.findAll)
router.get("/:id" , SectionController.findOne)
router.post("/" , AuthorizationGuard , RoleGuard("ADMIN") , SectionController.create)
router.patch("/:id" , AuthorizationGuard , RoleGuard("ADMIN") , SectionController.update)
router.delete("/:id" , AuthorizationGuard , RoleGuard("ADMIN") , SectionController.delete)
export {
    router as SectionRouter
}