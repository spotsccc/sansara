import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../config/index.js";
import * as schema from "./schema.js";
export let db;
export function initializeDatabase() {
    db = drizzle(new Pool({
        host: config.DB_HOST,
        user: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        port: Number(config.DB_PORT),
        database: config.DB_NAME,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ...{
            ssl: config.ENV === "production"
                ? {
                    rejectUnauthorized: false,
                    requestCert: false,
                }
                : undefined,
        },
    }), {
        schema,
    });
}
