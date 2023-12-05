import mysql from "mysql2"
import fs from "fs";
import path from "path";
import {MYSQL_CONNECTION_URL} from "../constants/index.js";
let db;

export function connectDb() {
    db = mysql.createConnection({
        uri :MYSQL_CONNECTION_URL,
        multipleStatements: true,
    })
    db.on("connect" ,  () => {
         createTables(db)
        seedData(db)
        console.log(`Database connected.`)
    })
    db.on("error" , error => {
        console.error(`Database failed to connect ${error}`)
    })
}

export function getDb(){
    return db
}

function createTables(db){
    const createTablesQuery = fs.readFileSync(path.join("src/share/db/queries/create-tables.sql"), "utf-8");
    db.query(createTablesQuery, function (err) {
        if (err) throw err;
        console.log("Tables created successfully.")
    });
}
function seedData(db){
    const seedQuery = fs.readFileSync(path.join("src/share/db/queries/seed.sql"), "utf-8");
    db.query(seedQuery, function (err) {
        if (err) throw err;
        console.log("Data seeded successfully.")
    });
}