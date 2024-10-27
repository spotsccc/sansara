import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authController } from "./modules/auth/controller";
import { initConfig } from "./config";
import { db, initializeDatabase } from "./db";
import { financeController } from "./modules/finance/controller";
import { syncController } from "./modules/sync/controller";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new Hono()
  .route("auth", authController)
  .route("finance", financeController)
  .route("sync", syncController);

initConfig();
initializeDatabase();

export type AppType = typeof app;

const port = 8080;

async function startApp() {
  await migrate(db, {
    migrationsFolder: path.join(__dirname, "..", "drizzle"),
  });

  serve({
    fetch: app.fetch,
    port,
  });
}

startApp();
