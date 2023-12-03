import mysql from "mysql2"
let db;

export function connectDb() {
    db = mysql.createConnection(process.env.MYSQL_CONNECTION_URL)
    db.on("connect" , () => {
        console.log(`Database connected.`)
    })
    db.on("error" , error => {
        console.error(`Database failed to connect ${error}`)
    })
}

export function getDb(){
    return db
}
