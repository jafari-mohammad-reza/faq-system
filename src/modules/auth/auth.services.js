import autoBind from "auto-bind";

class AuthServices {
    constructor(){
        autoBind(this)
    }
}
export default new AuthServices()