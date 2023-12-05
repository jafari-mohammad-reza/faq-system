import autoBind from "auto-bind";
import SectionServices from "./section.service.js";
import createHttpError from "http-errors";
import {createTopicValidator, IdValidator, updateTopicValidator} from "./section.validator.js";


class SectionController {
    #service
    constructor() {
        autoBind(this);
        this.#service = SectionServices;
    }
    async findAll(req,res,next) {
   try{
       const sections = await this.#service.findAll(req.user.roles)
       return res.status(200).json({
           status:200,
           success:true,
           data:sections
       })
   }catch (err){
       next(createHttpError(err))
   }
    }
    async findOne(req,res,next) {
        try{
            const id = await IdValidator.validateAsync(req.params.id)
            console.log("ID" , id)
            const section = await this.#service.findOne(id)
            return res.status(200).json({
                status:200,
                success:true,
                data:section
            })
        }catch (err){
            next(createHttpError(err))
        }
    }
    async create(req,res,next) {
        try{
            const body = await createTopicValidator.validateAsync(req.body)
            const {name, status} = body
            const sections = await this.#service.create(name,status)
            return res.status(200).json({
                status:200,
                success:true,
                data:sections
            })
        }catch (err){
            next(createHttpError(err))
        }
    }
    async update(req,res,next) {
        try{
            const id = await IdValidator.validateAsync(req.params.id)
            const body = await updateTopicValidator.validateAsync(req.body)
            const {name, status} = body
            await this.#service.update(id,name,status)
            return res.status(200).json({
                status:200,
                success:true,
            })
        }catch (err){
            next(createHttpError(err))
        }
    }
    async delete(req,res,next) {
        try{
            const id = await IdValidator.validateAsync(req.params.id)
            await this.#service.delete(id)
            return res.status(200).json({
                status:200,
                success:true,
            })
        }catch (err){
            next(createHttpError(err))
        }
    }

}

export default new SectionController()