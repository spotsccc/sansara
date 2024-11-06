import { Locator, Page } from "@playwright/test";
import { AccountCard, createAccountCard } from "../../blocks/account-card";

export type AccountsPage = {
  root: Locator;
  title: Locator;
  createAccountButton: Locator;
  accountList: AccountList;
};

export type AccountList = {
  getAccountByName(name: string): AccountCard;
  count(): Promise<number>;
  root: Locator;
};

export async function openAccountsPage(page: Page): Promise<AccountsPage> {
  await page.goto("http://localhost:5173/");

  return createAccountsPage(page);
}

export async function waitForAccountsPageLoad(
  page: Page,
): Promise<AccountsPage> {
  await page.waitForURL("http://localhost:5173/");

  return createAccountsPage(page);
}

export function createAccountsPage(page: Page): AccountsPage {
  return {
    root: page.getByTestId("root"),
    title: page.getByTestId("title"),
    createAccountButton: page.getByTestId("create-account-button"),
    accountList: createAccountList(page.getByTestId("account-list")),
  };
}

export function createAccountList(locator: Locator): AccountList {
  return {
    root: locator,
    count() {
      return locator.count();
    },
    getAccountByName(name) {
      return createAccountCard(
        locator.getByTestId("account-card").filter({ hasText: name }),
      );
    },
  };
}
