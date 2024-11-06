import { test, expect } from "@playwright/test";
import { truncateAll } from "../database/truncate";
import { login } from "../pages/auth/login";
import {
  openAccountsPage,
  waitForAccountsPageLoad,
} from "../pages/finance/accounts";
import { waitForCreateAccountPageLoad } from "../pages/finance/create-accont-page";

test.describe("finance", () => {
  test.beforeEach(async ({ page }) => {
    await truncateAll();
    await login(page);
  });

  test("create new account", async ({ page }) => {
    let accountsPage = await openAccountsPage(page);

    await accountsPage.createAccountButton.click();
    const createAccountPage = await waitForCreateAccountPageLoad(page);

    await createAccountPage.currencyScreen.currencyList.root
      .getByText("BTC")
      .click();

    await createAccountPage.nameScreen.nameInput.input.fill("test");
    await createAccountPage.nameScreen.confirmButton.click();

    await expect(createAccountPage.finalScreen.name).toHaveText("test");
    await expect(createAccountPage.finalScreen.currency).toHaveText("BTC");

    await createAccountPage.finalScreen.confirmButton.click();

    accountsPage = await waitForAccountsPageLoad(page);

    const accountCard = accountsPage.accountList.getAccountByName("test");

    expect(await accountsPage.accountList.count()).toBe(1);
    await expect(accountCard.root).toBeVisible();
    await expect(accountCard.balance).toHaveText("0.00 BTC");
  });
});
