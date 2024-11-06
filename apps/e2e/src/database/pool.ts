import { Pool } from "pg";

let pool: Pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env["DB_HOST"],
      user: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      port: Number(process.env["DB_PORT"]),
      database: process.env["DB_NAME"],
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  return pool;
}
