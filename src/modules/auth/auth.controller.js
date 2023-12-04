import autoBind from "auto-bind";
import AuthServices from "./auth.services.js";
import { usernamePasswordValidator} from "./auth.validator.js";

class AuthController {
    #service;
    constructor(){
        autoBind(this);
        this.#service = AuthServices;
    }
    async login(req,res){
        await usernamePasswordValidator.validateAsync(req.body)
        return res.status(200).json({
            status:200,
            success:true,
            token:""
        })
    }
    async register(req,res){
        await usernamePasswordValidator.validateAsync(req.body)
        return res.status(200).json({
            status:200,
            success:true,
            message:"success"
        })
    }
}

export default new AuthController()