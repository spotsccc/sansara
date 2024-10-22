import { Hono } from "hono";
import { createError, createSuccess, isError } from "@repo/result";
import { authGuard, getUser } from "../auth/auth-guard";
import { getAccounts } from "./repository/account/get-accounts";
import { z } from "zod";
import { validator } from "hono/validator";
import { getAccountById } from "./repository/account/get-account-by-id";
import { accountSave } from "./services/account-save";
import { applyTransactionService } from "./services/transaction-applier";
import { accountSaveInput } from "@repo/contracts/finance";
const TransactionBase = z.object({
    amount: z.string(),
    currency: z.string(),
    accuracy: z.number(),
    description: z.string().optional(),
});
const TransactionIncome = TransactionBase.extend({
    type: z.literal("income"),
});
const TransactionExpense = TransactionBase.extend({
    type: z.literal("expense"),
    category: z.number(),
});
const TransactionTransfer = TransactionBase.extend({
    receiveAmount: z.string(),
    receiveCurrency: z.string(),
    receiveAccuracy: z.number(),
    receiverId: z.number(),
    type: z.literal("transfer"),
});
export const transactionCreateInput = z.discriminatedUnion("type", [
    TransactionIncome,
    TransactionExpense,
    TransactionTransfer,
]);
export const financeController = new Hono()
    .get("/accounts", async (c) => {
    const authResult = await authGuard(c);
    if (isError(authResult)) {
        return c.json(authResult);
    }
    const user = authResult.success.user;
    const accounts = await getAccounts(user.id);
    return c.json(createSuccess({ accounts }));
})
    .get("/accounts/:id", async (c) => {
    const authResult = await authGuard(c);
    if (isError(authResult)) {
        return c.json(authResult);
    }
    const user = authResult.success.user;
    const account = await getAccountById(c.req.param("id"));
    if (!account) {
        return c.json(createError({ message: "account not found" }));
    }
    if (account.userId !== user.id) {
        return c.json(createError({ message: "Permission denied" }));
    }
    return c.json(createSuccess({ account }));
})
    .post("/accounts/:id/transactions", validator("json", (value) => value), async (c) => {
    const authResult = await authGuard(c);
    if (isError(authResult)) {
        return c.json(authResult);
    }
    const applyTransactionResult = await applyTransactionService(c.req.valid("json"));
    return c.json(applyTransactionResult);
})
    .post("/accounts", validator("json", (input, c) => {
    const i = accountSaveInput.safeParse(input);
    if (!i.success) {
        return c.json(createError({ type: "validation-error", errors: i.error.flatten() }));
    }
    return i.data;
}), async (c, next) => {
    const authRes = await authGuard(c);
    if (isError(authRes)) {
        return c.json(createError({ type: "unauthorized" }));
    }
    await next();
}, async (c) => {
    const input = c.req.valid("json");
    const user = await getUser(c);
    const res = await accountSave(input, user);
    return c.json(res);
});
