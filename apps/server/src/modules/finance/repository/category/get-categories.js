import { eq } from "drizzle-orm";
import { db } from "~/db/index.js";
import { categories } from "~/db/schema.js";
export async function getCategories(userId) {
    const cts = await db.query.categories.findMany({
        where: eq(categories.userId, userId),
    });
    return cts;
}
