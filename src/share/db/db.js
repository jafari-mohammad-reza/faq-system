import mysql from "mysql2"
import fs from "fs";
import path from "path";
let db;

export function connectDb() {
    db = mysql.createConnection({
        uri :process.env.MYSQL_CONNECTION_URL,
        multipleStatements: true,
    })
    db.on("connect" , async () => {
        await createTables(db)
        console.log(`Database connected.`)
    })
    db.on("error" , error => {
        console.error(`Database failed to connect ${error}`)
    })
}

export function getDb(){
    return db
}

async function createTables(db){
    const createTablesQuery = fs.readFileSync(path.join("src/share/db/queries/create-tables.sql"), "utf-8");
    db.query(createTablesQuery, function (err, results) {
        if (err) throw err;
        console.log("Tables created successfully.")
    });
}
