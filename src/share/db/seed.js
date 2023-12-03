import path from "path";
import fs from "fs";

export function seed(){
    const seedDataFilesDir = path.join("seed");
    console.log(`Resolved Seed Data Files Directory: ${seedDataFilesDir}`);
    const seedDataFiles = fs.readdirSync(seedDataFilesDir)
    for(const seedFile of seedDataFiles){
        const seedContent = fs.readFileSync(path.join(seedDataFilesDir,seedFile) , {encoding:"utf-8"})
        console.log(seedContent)
    }
}
seed()