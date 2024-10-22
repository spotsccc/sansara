import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { type InferModel } from "drizzle-orm";
import { users } from "~/modules/user/schemas/users";

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  balance: jsonb("balance").notNull(),
  defaultCurrency: varchar("default_currency", { length: 32 }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export type AccountSchema = InferModel<typeof accounts>;
