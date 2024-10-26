import { Hono } from "hono";
import { authGuard } from "../auth/auth-guard";
import { getAccounts } from "../finance/repository/account/get-accounts";
import { db } from "~/db";
import { and, gt, eq } from "drizzle-orm";
import { accounts } from "~/db/schema";
import { createSuccess, isError } from "@repo/result";

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
    const accs = await db.query.accounts.findMany({
      where: and(
        gt(accounts.updatedAt, syncDate),
        eq(accounts.userId, user.id),
      ),
    });

    return c.json(createSuccess({ accs }));
  });
