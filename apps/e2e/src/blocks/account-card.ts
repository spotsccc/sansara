import { Locator } from "@playwright/test";

export type AccountCard = {
  name: Locator;
  balance: Locator;
  createIncome: Locator;
  createExpense: Locator;
  createTransfer: Locator;
  root: Locator;
};

export function createAccountCard(locator: Locator): AccountCard {
  return {
    root: locator,
    name: locator.getByTestId("name"),
    balance: locator.getByTestId("balance"),
    createIncome: locator.getByTestId("create-income"),
    createTransfer: locator.getByTestId("create-transfer"),
    createExpense: locator.getByTestId("create-expense"),
  };
}
