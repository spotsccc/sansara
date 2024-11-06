import { v7 } from "uuid";

import { moneySchema, type Money } from "../money";
import { z } from "zod";

export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  defaultCurrency: z.string(),
  balance: z.record(moneySchema),
});

export type Account = z.infer<typeof accountSchema>;

export function createAccount({
  name,
  userId,
  defaultCurrency,
}: {
  name: string;
  userId: string;
  defaultCurrency: string;
}): Account {
  const balance = {
    [defaultCurrency]: {
      amount: "0",
      currency: defaultCurrency,
      accuracy: 0,
    },
  };

  return {
    id: v7(),
    name,
    userId,
    balance,
    defaultCurrency,
  };
}
