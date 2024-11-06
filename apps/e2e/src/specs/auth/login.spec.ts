import { test, expect } from "@playwright/test";
import { truncateAll } from "../../database/truncate";
import { openLoginPage } from "../../pages/auth/login";
import { createUser } from "../../database/create-user";
import { generateUser } from "../../faker/user";
import { waitForAccountsPageLoad } from "../../pages/finance/accounts";

test.describe("login", () => {
  test.beforeEach(async () => {
    await truncateAll();
  });

  test("success", async ({ page }) => {
    const userData = generateUser();
    await createUser(userData);

    const registerPage = await openLoginPage(page);

    await registerPage.form.email.input.fill(userData.email);
    await registerPage.form.password.input.fill(userData.password);

    await registerPage.form.submitButton.click();

    const accountsPage = await waitForAccountsPageLoad(page);

    await expect(accountsPage.title).toHaveText("Accounts:");
  });

  test("wrong password", async ({ page }) => {
    const userData = generateUser();
    await createUser(userData);

    const registerPage = await openLoginPage(page);

    await registerPage.form.email.input.fill(userData.email);
    await registerPage.form.password.input.fill("randompassword");

    await registerPage.form.submitButton.click();

    await expect(registerPage.form.email.error).toHaveText(
      "Wrong email or password",
    );
  });

  test("user does't exist", async ({ page }) => {
    const registerPage = await openLoginPage(page);

    await registerPage.form.email.input.fill("random@email.com");
    await registerPage.form.password.input.fill("randompassword");

    await registerPage.form.submitButton.click();

    await expect(registerPage.form.email.error).toHaveText(
      "Wrong email or password",
    );
  });
});
