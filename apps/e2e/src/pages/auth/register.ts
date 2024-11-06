import { Locator, Page } from "@playwright/test";
import { createInput, Input } from "../../blocks/input";

export type RegisterPage = {
  root: Locator;
  title: Locator;
  form: RegisterForm;
  alreadyHaveAccountLink: Locator;
};

export type RegisterForm = {
  email: Input;
  username: Input;
  password: Input;
  repeatPassword: Input;
  submitButton: Locator;
};

export async function openRegisterPage(page: Page): Promise<RegisterPage> {
  await page.goto("http://localhost:5173/auth/register");
  return {
    form: registerForm(page),
    root: page.getByTestId("root"),
    title: page.getByTestId("title"),
    alreadyHaveAccountLink: page.getByTestId("already-have-account-link"),
  };
}

export function registerForm(page: Page): RegisterForm {
  const registerFormLocator = page.getByTestId("register-form");

  return {
    submitButton: registerFormLocator.getByTestId("submit-button"),
    email: createInput(registerFormLocator.getByTestId("email")),
    username: createInput(registerFormLocator.getByTestId("username")),
    password: createInput(registerFormLocator.getByTestId("password")),
    repeatPassword: createInput(
      registerFormLocator.getByTestId("repeat-password"),
    ),
  };
}
