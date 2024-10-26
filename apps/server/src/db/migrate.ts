import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import * as schema from "./schema";

const connection = new Client({
  connectionString: process.env["DATABASE_URL"],
  ssl: {
    rejectUnauthorized: true,
    ca: process.env["CA_CERT"],
  },
});

console.log(process.env["DATABASE_URL"]);

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
