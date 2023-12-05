import autoBind from "auto-bind";
import {BaseRepository} from "../../share/db/base.repository.js";
import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import {SECTION_NOT, SECTION_TITLE_EXIST} from "./section.messages.js";

class SectionServices {
    #service
    constructor() {
        autoBind(this)
        this.#service = new BaseRepository("Section")
    }
    async findAll(userRole) {
    }
    async findOne(id) {
        const section = await this.#service.findOne(id)
        if(!section){
            throw new createHttpError(statusCodes.NOT_FOUND , SECTION_NOT)
        }
    }
    async create(title) {}
    async update(id,title, status) {
        await this.findOne(id)
        if(title) {
            await this.titleExist(title)
        }
    }
    async delete(id) {
        await this.findOne(id)
    }
    async titleExist(title) {
        const existSection = await this.#service.findOneBy("Title" , title)
        if(existSection){
            throw new createHttpError(statusCodes.BAD_REQUEST , SECTION_TITLE_EXIST)
        }
    }
}

export default new SectionServices()