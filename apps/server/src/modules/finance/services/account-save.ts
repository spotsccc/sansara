import { Account } from "@repo/models/finance";
import { saveAccount } from "../repository/account/save-account";
import { createError, createSuccess } from "@repo/result";
import { AccountSaveOutput } from "../../../../../../packages/contracts/src/finance/account/create";
import { User } from "@repo/models/users";

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
