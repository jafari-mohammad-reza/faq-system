import autoBind from "auto-bind";

class SectionServices {
    constructor() {
        autoBind(this)
    }
}

export default new SectionServices()