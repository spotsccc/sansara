import { db } from "~/db";
export async function getCategories(userId) {
    const categories = await db.query.categories.findMany({
        where: (category, { eq }) => eq(category.userId, userId),
    });
    return categories;
}
