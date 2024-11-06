import { type Category } from "@repo/models/finance";
import { db } from "~/db";
import { eq } from "drizzle-orm";
import { categories } from "../../schemas/categories";

export async function saveCategory(category: Category): Promise<Category> {
  const alreadyExist = await db.query.categories.findFirst({
    where: eq(categories.id, category.id),
  });

  if (!!alreadyExist) {
    return (
      await db
        .update(categories)
        .set(category)
        .where(eq(categories.id, category.id))
        .returning()
    )[0];
  }

  return (await db.insert(categories).values(category).returning())[0];
}
