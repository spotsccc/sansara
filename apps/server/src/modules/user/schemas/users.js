import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: uuid("id").primaryKey().notNull(),
    username: varchar("username", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 512 }).notNull(),
    email: varchar("email", { length: 100 }).unique().notNull(),
});
