import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "~/modules/user/schemas/users";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey(),
  title: varchar("category_title", { length: 512 }).notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});
