import autoBind from "auto-bind";
import SectionServices from "./section.services.js";


class SectionController {
    #service
    constructor() {
        autoBind(this);
        this.#service = SectionServices;
    }
    async findAll(req,res,next) {}
    async findOne(req,res,next) {}
    async create(req,res,next) {}
    async update(req,res,next) {}
    async delete(req,res,next) {}

}

export default new SectionController()