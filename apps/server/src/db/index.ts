import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { config } from "../config/index";
import * as schema from "./schema";
export let db: NodePgDatabase<typeof schema>;

export function initializeDatabase() {
  db = drizzle(
    new Pool({
      host: config.DB_HOST,
      user: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      port: Number(config.DB_PORT),
      database: config.DB_NAME,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ssl: {
        rejectUnauthorized: true,
        ca: config.DB_CA,
      },
    }),
    {
      schema,
    },
  );
}
