import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authController } from "./modules/auth/controller.js";
import { initConfig } from "./config/index.js";
import { initializeDatabase } from "./db/index.js";
import { financeController } from "./modules/finance/controller.js";
import { syncController } from "./modules/sync/controller.js";
const app = new Hono()
    .use(cors({
    origin: "http://localhost:5173",
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
}))
    .route("auth", authController)
    .route("finance", financeController)
    .route("sync", syncController);
initConfig();
initializeDatabase();
const port = 3000;
serve({
    fetch: app.fetch,
    port,
});
