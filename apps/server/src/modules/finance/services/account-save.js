import { saveAccount } from "../repository/account/save-account";
import { createError, createSuccess } from "@repo/result";
export async function accountSave(account, user) {
    if (user.id !== account.userId) {
        return createError({ type: "access-denied" });
    }
    try {
        await saveAccount(account);
        return createSuccess(account);
    }
    catch (e) {
        if (e instanceof Error) {
            return createError({ type: "account-save-error", message: e.message });
        }
        return createError({
            type: "account-save-error",
            message: "Unknown error",
        });
    }
}
