import { z } from "zod";
import "dotenv/config";
declare const configScheme: z.ZodObject<{
    DB_USERNAME: z.ZodString;
    DB_PASSWORD: z.ZodString;
    DB_HOST: z.ZodString;
    DB_PORT: z.ZodString;
    DB_NAME: z.ZodString;
    ENV: z.ZodUnion<[z.ZodLiteral<"production">, z.ZodLiteral<"development">]>;
}, "strip", z.ZodTypeAny, {
    DB_HOST: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: string;
    DB_USERNAME: string;
    ENV: "production" | "development";
}, {
    DB_HOST: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: string;
    DB_USERNAME: string;
    ENV: "production" | "development";
}>;
export type Config = z.infer<typeof configScheme>;
export declare let config: Config;
export declare function initConfig(): {
    config: {
        DB_HOST: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        DB_PORT: string;
        DB_USERNAME: string;
        ENV: "production" | "development";
    };
    error?: undefined;
} | {
    error: z.ZodError<{
        DB_HOST: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        DB_PORT: string;
        DB_USERNAME: string;
        ENV: "production" | "development";
    }>;
    config?: undefined;
};
export {};
//# sourceMappingURL=index.d.ts.map