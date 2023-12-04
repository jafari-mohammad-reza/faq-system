import {getDb} from "./db.js";

export class BaseRepository {
    #db
    #table
    constructor(table) {
        this.#db = getDb()
        this.#table = table
    }
    async findAll() {
        try {
            const query = `SELECT * FROM ${this.#table}`;
            const [rows] = await this.#db.promise().query(query);
            console.log(rows);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async findOneById(id) {
        try {
            const query = `SELECT * FROM ${this.#table} WHERE id = ?`;
            const [rows] = await this.#db.promise().query(query, [id]);
            console.log(rows);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findOneBy(column, value) {
        try {
            const query = `SELECT * FROM ${this.#table} WHERE ${column} = ?`;
            const [rows] = await this.#db.promise().query(query, [value]); // pass value here to prevent sql injection.
            console.log(rows);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async create(input) {
        try {
            const columns = Object.keys(input).join(', ');
            const placeholders = Object.keys(input).map(() => '?').join(', ');
            const values = Object.values(input);

            const query = `INSERT INTO ${this.#table} (${columns}) VALUES (${placeholders})`;
            const [result] = await this.#db.promise().query(query, values);
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async update(id, input) {
        try {
            const updates = Object.keys(input).map(key => `${key} = ?`).join(', ');
            const values = [...Object.values(input), id];

            const query = `UPDATE ${this.#table} SET ${updates} WHERE id = ?`;
            const [result] = await this.#db.promise().query(query, values);
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async delete(id) {
        try {
            const query = `DELETE FROM ${this.#table} WHERE id = ?`;
            const [result] = await this.#db.promise().query(query, [id]);
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async query(query){
        await this.#db.promise().query(query);
    }
}
