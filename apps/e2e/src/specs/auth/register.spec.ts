import { test, expect } from "@playwright/test";
import { openRegisterPage } from "../../pages/auth/register";
import { truncateAll } from "../../database/truncate";

test.describe("register", () => {
  test.beforeEach(async () => {
    await truncateAll();
  });

  test("success", async ({ page }) => {
    const registerPage = await openRegisterPage(page);

    await registerPage.form.username.input.fill("testusername");
    await registerPage.form.email.input.fill("test@email.com");
    await registerPage.form.password.input.fill("strongpassword123");
    await registerPage.form.repeatPassword.input.fill("strongpassword123");

    await registerPage.form.submitButton.click();

    await page.waitForURL("http://localhost:5173/");
  });

  test("empty fields", async ({ page }) => {
    const registerPage = await openRegisterPage(page);

    await registerPage.form.submitButton.click();

    await expect(registerPage.form.email.error).toHaveText("Invalid email");
    await expect(registerPage.form.username.error).toHaveText(
      "String must contain at least 1 character(s)",
    );
    await expect(registerPage.form.password.error).toHaveText(
      "String must contain at least 8 character(s)",
    );
    await expect(registerPage.form.repeatPassword.error).toHaveText(
      "String must contain at least 8 character(s)",
    );
  });

  test("with username that already exist", async ({ page }) => {
    let registerPage = await openRegisterPage(page);

    await registerPage.form.username.input.fill("testusername1");
    await registerPage.form.email.input.fill("test1@email.com");
    await registerPage.form.password.input.fill("strongpassword123");
    await registerPage.form.repeatPassword.input.fill("strongpassword123");

    await registerPage.form.submitButton.click();

    await page.waitForURL("http://localhost:5173/");

    registerPage = await openRegisterPage(page);

    await registerPage.form.username.input.fill("testusername1");
    await registerPage.form.email.input.fill("test3@email.com");
    await registerPage.form.password.input.fill("strongpassword123");
    await registerPage.form.repeatPassword.input.fill("strongpassword123");

    await registerPage.form.submitButton.click();

    await expect(registerPage.form.username.error).toHaveText(
      "Username already exist",
    );
  });

  test("with email that already exist", async ({ page }) => {
    let registerPage = await openRegisterPage(page);

    await registerPage.form.username.input.fill("testusername2");
    await registerPage.form.email.input.fill("test2@email.com");
    await registerPage.form.password.input.fill("strongpassword123");
    await registerPage.form.repeatPassword.input.fill("strongpassword123");

    await registerPage.form.submitButton.click();

    await page.waitForURL("http://localhost:5173/");

    registerPage = await openRegisterPage(page);

    await registerPage.form.username.input.fill("testusername3");
    await registerPage.form.email.input.fill("test2@email.com");
    await registerPage.form.password.input.fill("strongpassword123");
    await registerPage.form.repeatPassword.input.fill("strongpassword123");

    await registerPage.form.submitButton.click();

    await expect(registerPage.form.email.error).toHaveText(
      "Email already exist",
    );
  });
});
