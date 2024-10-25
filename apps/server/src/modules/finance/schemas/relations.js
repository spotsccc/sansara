import { accounts } from "./accounts.js";
import { relations } from "drizzle-orm";
import { transactions } from "./transactions.js";
import { users } from "~/modules/user/schemas/users.js";
import { categories } from "./categories.js";
export const accountsRelations = relations(accounts, ({ one, many }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
    transactions: many(transactions),
}));
export const transactionsRelations = relations(transactions, ({ one }) => ({
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    receiver: one(accounts, {
        fields: [transactions.receiverId],
        references: [accounts.id],
    }),
    category: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}));
export const categoriesRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
}));