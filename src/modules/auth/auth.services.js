import autoBind from "auto-bind";
import {BaseRepository} from "../../share/db/base.repository.js";
import createHttpError from "http-errors";
import statusCodes from "http-status-codes";

class AuthServices {
    #repo
    constructor(){
        autoBind(this)
        this.#repo = new BaseRepository("User")
    }
    async login(username , password){
        const existUser = await this.#repo.findOneBy("username" , username)
        console.log("existUser"  , existUser)
        if(!existUser.length) {
            throw new createHttpError(statusCodes.BAD_REQUEST)
        }

    }
    async register(username , password){

    }
}
export default new AuthServices()