import { InferModel, relations } from "drizzle-orm";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { users } from "../../user/schemas/users";

export const accessTokens = pgTable("access_tokens", {
  token: uuid("token").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp("expires_at", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
});

export const accessTokensRelation = relations(accessTokens, ({ one }) => ({
  user: one(users, {
    fields: [accessTokens.userId],
    references: [users.id],
  }),
}));

export type AccessTokenSchema = InferModel<typeof accessTokens>;
