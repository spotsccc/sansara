import { type Account } from "@repo/models/finance";
import { saveAccount } from "../repository/account/save-account.js";
import { createError, createSuccess } from "@repo/result";
import { type User } from "@repo/models/users";
import { type AccountSaveOutput } from "@repo/contracts/finance";

export async function accountSave(
  account: Account,
  user: User,
): Promise<AccountSaveOutput> {
  if (user.id !== account.userId) {
    return createError({ type: "access-denied" });
  }

  try {
    await saveAccount(account);
    return createSuccess(account);
  } catch (e) {
    if (e instanceof Error) {
      return createError({ type: "account-save-error", message: e.message });
    }

    return createError({
      type: "account-save-error",
      message: "Unknown error",
    });
  }
}
