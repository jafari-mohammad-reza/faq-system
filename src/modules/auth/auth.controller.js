import autoBind from "auto-bind";
import AuthServices from "./auth.services.js";
import { usernamePasswordValidator} from "./auth.validator.js";
import createHttpError from "http-errors";

class AuthController {
    #service;
    constructor(){
        autoBind(this);
        this.#service = AuthServices;
    }
    async login(req,res,next){
        try{
            const validatedBody = await usernamePasswordValidator.validateAsync(req.body);
            const { username, password } = validatedBody;
            const token = await this.#service.login(username , password)
            return res.status(200).json({
                status:200,
                success:true,
                token
            })
        }catch (err){
            next(createHttpError(err))
        }
    }
    async register(req,res,next){
        try{
            const body = await usernamePasswordValidator.validateAsync(req.body)
            const {username , password} = body
            await this.#service.register(username , password)
            return res.status(200).json({
                status:200,
                success:true,
                message:"success"
            })
        }catch (err){
            next(createHttpError(err))
        }
    }
}

export default new AuthController()