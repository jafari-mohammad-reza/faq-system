import {getDb} from "./db.js";
import autoBind from "auto-bind";

export class BaseRepository {
    #table

    constructor(table) {
        autoBind(this)
        this.#table = table;
    }

    async findAll() {
        try {
            const db = getDb()
            const query = `SELECT *
                           FROM ${this.#table}`;
            const [rows] = await db.promise().query(query);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findAllByIds(ids) {
        try {
            const db = getDb()
            const query = `SELECT *
                           FROM ${this.#table}
                           WHERE id IN (?)`;
            const [rows] = await db.promise().query(query, ids);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findAllBy(column, values) {
        try {
            const db = getDb()
            const query = `SELECT *
                           FROM ${this.#table}
                           WHERE ${column} IN (?)`;
            const [rows] = await db.promise().query(query, [values]);
            return rows;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findOneById(id) {
        try {
            const db = getDb()
            const query = `SELECT *
                           FROM ${this.#table}
                           WHERE id = ?`;
            const [rows] = await db.promise().query(query, [id]);
            return rows[0];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async findOneBy(column, value, table) {
        try {
            const db = getDb()
            const query = `SELECT *
                           FROM ${this.#table || table}
                           WHERE ${column} = ?`;
            const [rows] = await db.promise().query(query, [value]); // pass value here to prevent sql injection.
            return rows[0];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async create(input) {
        try {
            const db = getDb()
            const columns = Object.keys(input).join(', ');
            const placeholders = Object.keys(input).map(() => '?').join(', ');
            const values = Object.values(input);
            console.log("values", values)
            console.log("placeholders", placeholders)
            const query = `INSERT INTO ${this.#table} (${columns})
                           VALUES (${placeholders})`;
            const [result] = await db.promise().query(query, values);
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async update(id, input) {
        try {
            const db = getDb()
            const updates = Object.keys(input).map(key => `${key} = ?`).join(', ');
            const values = [...Object.values(input), id];

            const query = `UPDATE ${this.#table}
                           SET ${updates}
                           WHERE id = ?`;
            const [result] = await db.promise().query(query, values);
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async delete(id) {
        try {
            const db = getDb()
            const query = `DELETE
                           FROM ${this.#table}
                           WHERE id = ?`;
            const [result] = await db.promise().query(query, [id]);
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async query(query) {
        const db = getDb()
        await db.promise().query(query);
    }
}
