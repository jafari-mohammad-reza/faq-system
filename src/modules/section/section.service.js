import autoBind from "auto-bind";
import {BaseRepository} from "../../share/db/base.repository.js";
import createHttpError from "http-errors";
import statusCodes, {StatusCodes} from "http-status-codes";
import {
    CREATE_FAILED,
    DELETE_FAILED,
    SECTION_NOT_FOUND,
    SECTION_TITLE_EXIST,
    UPDATE_FAILED
} from "./section.messages.js";

class SectionService {
    #repo
    constructor() {
        autoBind(this)
        this.#repo = new BaseRepository("Section")
    }
    async findAll(userRole) {
        return  await this.#repo.findAll(userRole.includes("USER")   ? "Status = 'Published'" : undefined)
    }
    async findOne(id) {
        const section = await this.#repo.findOneById(id)
        if(!section){
            throw new createHttpError(statusCodes.NOT_FOUND , SECTION_NOT_FOUND)
        }
        return section
    }
    async create(name, status) {
        await this.nameExist(name)
        const result = await this.#repo.create({Name:name,Status:status})
        if(!result.affectedRows){
            throw new createHttpError(StatusCodes.INTERNAL_SERVER_ERROR , CREATE_FAILED)
        }
    }
    async update(id,name, status) {
        await this.findOne(id)
        if(name) {
            await this.nameExist(name)
        }
        const result = await this.#repo.update(id , {Name:name,Status:status})
        if(!result.affectedRows){
            throw new createHttpError(StatusCodes.INTERNAL_SERVER_ERROR , UPDATE_FAILED)
        }
    }
    async delete(id) {
        await this.findOne(id)
        const result = await this.#repo.delete(id)
        if(!result.affectedRows){
            throw new createHttpError(StatusCodes.INTERNAL_SERVER_ERROR , DELETE_FAILED)
        }
    }
    async nameExist(name) {
        const existSection = await this.#repo.findOneBy("Name" , name)
        if(existSection){
            throw new createHttpError(statusCodes.BAD_REQUEST , SECTION_TITLE_EXIST)
        }
    }
}

export default new SectionService()