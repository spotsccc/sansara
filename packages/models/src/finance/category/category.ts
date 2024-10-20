import { v7 } from "uuid";

export type Category = {
  title: string;
  id: string;
  userId: string;
};

export function createCategory(c: Omit<Category, "id">) {
  return {
    ...c,
    id: v7(),
  };
}
