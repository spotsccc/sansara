import { type Category } from "@repo/models/finance";
import { db } from "~/db";

export async function getCategories(userId: string): Promise<Array<Category>> {
  const categories = await db.query.categories.findMany({
    where: (category, { eq }) => eq(category.userId, userId),
  });

  return categories;
}
