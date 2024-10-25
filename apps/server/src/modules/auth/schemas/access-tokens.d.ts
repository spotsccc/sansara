import { type InferModel } from "drizzle-orm";
export declare const accessTokens: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "access_tokens";
    schema: undefined;
    columns: {
        token: import("drizzle-orm/pg-core").PgColumn<{
            name: "token";
            tableName: "access_tokens";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "access_tokens";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
        expiresAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "expires_at";
            tableName: "access_tokens";
            dataType: "string";
            columnType: "PgTimestampString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const accessTokensRelation: import("drizzle-orm").Relations<"access_tokens", {
    user: import("drizzle-orm").One<"users", true>;
}>;
export type AccessTokenSchema = InferModel<typeof accessTokens>;
//# sourceMappingURL=access-tokens.d.ts.map