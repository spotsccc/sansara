import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { config } from "../config/index";
import * as schema from "./schema";
export let db: NodePgDatabase<typeof schema>;

export function initializeDatabase() {
  db = drizzle(
    new Pool({
      connectionString: config.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ...{
        ssl:
          config.ENV === "production"
            ? {
                rejectUnauthorized: false,
                requestCert: false,
              }
            : undefined,
      },
    }),
    {
      schema,
    },
  );
}
