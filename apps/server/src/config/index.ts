import { z } from "zod";
import "dotenv/config";

const configScheme = z.object({
  DATABASE_URL: z.string(),
  ENV: z.union([z.literal("production"), z.literal("development")]),
});

export type Config = z.infer<typeof configScheme>;

export let config: Config;

export function initConfig() {
  const mayBeConfig = {
    DATABASE_URL: process.env["DATABASE_URL"],
    ENV: process.env["ENV"],
  };

  const { success, data, error } = configScheme.safeParse(mayBeConfig);
  if (success) {
    config = data;
    return { config };
  }

  return { error };
}
