import { Locator, Page } from "@playwright/test";
import { createInput, Input } from "../../blocks/input";
import { generateUser } from "../../faker/user";
import { createUser } from "../../database/create-user";
import { waitForAccountsPageLoad } from "../finance/accounts";

export type LoginPage = {
  root: Locator;
  title: Locator;
  form: LoginForm;
  dontHaveAccountLink: Locator;
};

export type LoginForm = {
  email: Input;
  password: Input;
  submitButton: Locator;
};

export async function openLoginPage(page: Page): Promise<LoginPage> {
  await page.goto("http://localhost:5173/auth/login");
  return {
    form: loginForm(page),
    root: page.getByTestId("root"),
    title: page.getByTestId("title"),
    dontHaveAccountLink: page.getByTestId("dont-have-account-link"),
  };
}

export function loginForm(page: Page): LoginForm {
  const loginFormLocator = page.getByTestId("login-form");

  return {
    submitButton: loginFormLocator.getByTestId("submit-button"),
    email: createInput(loginFormLocator.getByTestId("email")),
    password: createInput(loginFormLocator.getByTestId("password")),
  };
}

export async function login(page: Page) {
  const userStub = generateUser();
  await createUser(userStub);

  const loginPage = await openLoginPage(page);

  await loginPage.form.email.input.fill(userStub.email);
  await loginPage.form.password.input.fill(userStub.password);
  await loginPage.form.submitButton.click();

  await waitForAccountsPageLoad(page);
}
