import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authController } from "./modules/auth/controller";
import { initConfig } from "./config";
import { initializeDatabase } from "./db";
import { financeController } from "./modules/finance/controller";
import { syncController } from "./modules/sync/controller";

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

initConfig();
initializeDatabase();

export type AppType = typeof app;

const port = 8080;

serve({
  fetch: app.fetch,
  port,
});
