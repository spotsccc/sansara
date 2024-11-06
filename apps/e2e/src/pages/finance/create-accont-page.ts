import { Locator, Page } from "@playwright/test";
import { Input, createInput } from "../../blocks/input";

export type CreateAccountPage = {
  root: Locator;
  title: Locator;
  currencyScreen: CurrencyScreen;
  nameScreen: NameScreen;
  finalScreen: FinalScreen;
};

export type CurrencyScreen = {
  title: Locator;
  searchInput: Input;
  currencyList: CurrencyList;
};

export type CurrencyList = {
  root: Locator;
};

export type NameScreen = {
  nameInput: Input;
  confirmButton: Locator;
};

export type FinalScreen = {
  name: Locator;
  currency: Locator;
  confirmButton: Locator;
};

export async function openCreateAccountPage(
  page: Page,
): Promise<CreateAccountPage> {
  await page.goto("http://localhost:5173/accounts/create");

  return createAccountsPage(page);
}

export async function waitForCreateAccountPageLoad(
  page: Page,
): Promise<CreateAccountPage> {
  await page.waitForURL("http://localhost:5173/accounts/create");

  return createAccountsPage(page);
}

function createAccountsPage(page: Page): CreateAccountPage {
  return {
    root: page.getByTestId("root"),
    title: page.getByTestId("title"),
    currencyScreen: createCurrencyScreen(page),
    nameScreen: createNameScreen(page),
    finalScreen: createFinalScreen(page),
  };
}

function createFinalScreen(page: Page): FinalScreen {
  return {
    name: page.getByTestId("name"),
    confirmButton: page.getByTestId("confirm-button"),
    currency: page.getByTestId("currency"),
  };
}

function createNameScreen(page: Page): NameScreen {
  return {
    nameInput: createInput(page.getByTestId("name-input")),
    confirmButton: page.getByTestId("confirm-button"),
  };
}

function createCurrencyScreen(page: Page): CurrencyScreen {
  return {
    title: page.getByTestId("title"),
    searchInput: createInput(page.getByTestId("search-input")),
    currencyList: createCurrencyList(page),
  };
}

function createCurrencyList(page: Page): CurrencyList {
  const root = page.getByTestId("currency-list");
  return {
    root,
  };
}
