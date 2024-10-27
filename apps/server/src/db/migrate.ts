import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";
import path from "path";

const connection = new Pool({
  host: process.env["DB_HOST"],
  user: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  port: Number(process.env["DB_PORT"]),
  database: process.env["DB_NAME"],
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env["DB_CA"],
  },
});

connection
  .connect()
  .then(() => {
    const db = drizzle(connection, {
      schema,
    });
    return migrate(db, {
      migrationsFolder: path.join(__dirname, "..", "drizzle"),
    });
  })
  .then(() => {
    connection.end();
  })
  .catch(console.log);
