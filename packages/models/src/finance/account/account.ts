import { v7 } from "uuid";

import type { Currency, Money } from "../money";

export type Account = {
  id: string;
  balance: Record<Currency, Money>;
  defaultCurrency: Currency;
  name: string;
  userId: string;
};

export function createAccount({
  name,
  userId,
  defaultCurrency,
}: {
  name: string;
  userId: string;
  defaultCurrency: Currency;
}): Account {
  const balance = {
    [defaultCurrency]: {
      amount: "0",
      currency: defaultCurrency,
      accuracy: 0,
    },
  } as unknown as Record<Currency, Money>;

  return {
    id: v7(),
    name,
    userId,
    balance,
    defaultCurrency,
  };
}
