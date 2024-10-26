import { z } from "zod";
import "dotenv/config";

const configScheme = z.object({
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  ENV: z.union([z.literal("production"), z.literal("development")]),
});

export type Config = z.infer<typeof configScheme>;

export let config: Config;

export function initConfig() {
  const mayBeConfig = {
    DB_USERNAME: process.env["DB_USERNAME"],
    DB_PASSWORD: process.env["DB_PASSWORD"],
    DB_HOST: process.env["DB_HOST"],
    DB_PORT: process.env["DB_PORT"],
    DB_NAME: process.env["DB_NAME"],
    ENV: process.env["ENV"],
  };

  const { success, data, error } = configScheme.safeParse(mayBeConfig);
  if (success) {
    config = data;
    return { config };
  }

  return { error };
}
