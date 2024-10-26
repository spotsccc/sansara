import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env["DB_HOST"]!,
    user: process.env["DB_USERNAME"]!,
    password: process.env["DB_PASSWORD"]!,
    port: Number(process.env["DB_PORT"]),
    database: process.env["DB_NAME"]!,
  },
});
