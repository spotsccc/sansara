import { categorySchema } from "@repo/models/finance";
import z from "zod";

export const categorySaveSchema = categorySchema;

export type CategorySaveInput = z.infer<typeof categorySaveSchema>;
