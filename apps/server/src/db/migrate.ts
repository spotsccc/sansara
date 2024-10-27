import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import * as schema from "./schema";

const connection = new Pool({
  connectionString: process.env["DATABASE_URL"],
  ssl: {
    rejectUnauthorized: true,
    ca: process.env["DATABASE_CA"],
  },
});

console.log(process.env["DATABASE_URL"]);
console.log(process.env["DATABASE_CA"]);

connection
  .connect()
  .then(() => {
    const db = drizzle(connection, {
      schema,
    });
    return migrate(db, { migrationsFolder: "./drizzle" });
  })
  .then(() => {
    connection.end();
  })
  .catch(console.log);
