import { decimal, integer, pgTable, timestamp, uuid, varchar, } from "drizzle-orm/pg-core";
import { accounts } from "./accounts.js";
import { categories } from "./categories.js";
import { users } from "~/modules/user/schemas/users.js";
export const transactions = pgTable("transactions", {
    id: uuid("user_id").primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    accountId: uuid("account_id")
        .references(() => accounts.id)
        .notNull(),
    type: varchar("type", { length: 64 }).notNull(),
    amount: decimal("amount", { precision: 32, scale: 0 }).notNull(),
    accuracy: integer("accuracy").notNull(),
    currency: varchar("currency", { length: 32 }).notNull(),
    description: varchar("description", { length: 512 }),
    createdAt: timestamp("create_at", { withTimezone: true }).notNull(),
    categoryId: uuid("category_id").references(() => categories.id),
    receiverId: uuid("category_id").references(() => accounts.id),
    receiveAmount: decimal("receive_amount", { precision: 32, scale: 0 }),
    receiveAccuracy: integer("receive_accuracy"),
    receiveCurrency: varchar("receive_currency", { length: 32 }),
});
