import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authController } from "./modules/auth/controller";
import { config, initConfig } from "./config";
import { db, initializeDatabase } from "./db";
import { financeController } from "./modules/finance/controller";
import { syncController } from "./modules/sync/controller";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "node:path";
import { fileURLToPath } from "url";
import { cors } from "hono/cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new Hono()
  .use(
    cors({
      origin: "http://localhost:5173",
      allowMethods: ["POST", "GET", "OPTIONS"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .route("auth", authController)
  .route("finance", financeController)
  .route("sync", syncController);

export type AppType = typeof app;

const port = 8080;

async function startApp() {
  if (process.env["ENV"] !== "production") {
    await import("dotenv/config");
  }

  initConfig();
  initializeDatabase();

  await migrate(db, {
    migrationsFolder: path.join(__dirname, "..", "drizzle"),
  });

  serve({
    fetch: app.fetch,
    port,
  });
}

startApp();
