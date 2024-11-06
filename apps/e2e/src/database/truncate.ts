import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  host: process.env["DB_HOST"],
  user: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  port: Number(process.env["DB_PORT"]),
  database: process.env["DB_NAME"],
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function truncateAll() {
  const client = await pool.connect();
  await client.query("TRUNCATE users CASCADE");
}
