import {
  decimal,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { type InferModel } from "drizzle-orm";
import { categories } from "./categories";
import { users } from "~/modules/user/schemas/users";

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey(),
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

  receiverId: uuid("receiverId").references(() => accounts.id),
  receiveAmount: decimal("receive_amount", { precision: 32, scale: 0 }),
  receiveAccuracy: integer("receive_accuracy"),
  receiveCurrency: varchar("receive_currency", { length: 32 }),
});

export type TransactionSchema = InferModel<typeof transactions>;
