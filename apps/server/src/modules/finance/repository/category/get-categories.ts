import { type Category } from "@repo/models/finance";
import { eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { categories } from "~/db/schema.js";

export async function getCategories(userId: string): Promise<Array<Category>> {
  const cts = await db.query.categories.findMany({
    where: eq(categories.userId, userId),
  });

  return cts;
}
