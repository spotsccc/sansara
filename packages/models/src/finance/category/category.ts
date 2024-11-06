import { v7 } from "uuid";
import { z } from "zod";

export const categorySchema = z.object({
  title: z.string(),
  id: z.string(),
  userId: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export function createCategory(c: Omit<Category, "id">) {
  return {
    ...c,
    id: v7(),
  };
}
