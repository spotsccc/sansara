import { Hono } from "hono";
import { authGuard } from "../auth/auth-guard";
import { createSuccess, isError } from "@repo/result";
import { getAccounts } from "../finance/repository/account/get-accounts";
import { db } from "~/db";

export const syncController = new Hono()
  .get("/load", async (c) => {
    const authRes = await authGuard(c);

    if (isError(authRes)) {
      return c.json(authRes);
    }

    const { user } = authRes.success;

    const accounts = await getAccounts(user.id!);

    return c.json(
      createSuccess({
        accounts,
      }),
    );
  })
  .get("/get-updates", async (c) => {
    const authRes = await authGuard(c);

    if (isError(authRes)) {
      return c.json(authRes);
    }

    const { user } = authRes.success;

    const syncDate = c.req.query("sync_date")!;
    const accounts = await db.query.accounts.findMany({
      where: (account, { gt, and, eq }) =>
        and(gt(account.updatedAt, syncDate), eq(account.userId, user.id)),
    });

    return c.json(createSuccess({ accounts }));
  });
