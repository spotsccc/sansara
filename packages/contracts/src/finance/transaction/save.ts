import { transactionSchema } from "@repo/models/finance";
import z from "zod";

export const transactionSaveInput = transactionSchema;

export type TransactionSaveInput = z.infer<typeof transactionSaveInput>;
export type TransactionSaveOutput = {};
