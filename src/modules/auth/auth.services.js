import autoBind from "auto-bind";
import {BaseRepository} from "../../share/db/base.repository.js";
import createHttpError from "http-errors";
import statusCodes from "http-status-codes";
import {compare , hash} from "bcrypt";
import {decodeToken, generateToken} from "../../share/utils/jwt.utils.js";

class AuthServices {
    #repo
    constructor(){
        autoBind(this)
        this.#repo = new BaseRepository("User")
    }
    async login(username , password){
        const existUser = await this.#repo.findOneBy("username" , username)
        if(!existUser) {
            throw new createHttpError(statusCodes.BAD_REQUEST)
        }
        const passwordCompare = await compare(password , existUser.Password)
        if(!passwordCompare){
            throw new createHttpError(statusCodes.BAD_REQUEST)
        }
        return await generateToken(existUser.Username)
    }
    async register(username , password){
        const existUser = await this.#repo.findOneBy("username" , username)
        if(existUser) {
            throw new createHttpError(statusCodes.BAD_REQUEST)
        }
        const hashedPassword = await hash(password , 10)
        await this.#repo.create({Username:username , Password:hashedPassword})
    }
}
export default new AuthServices()