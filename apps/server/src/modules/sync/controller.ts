import { Hono } from "hono";
import { authGuard } from "../auth/auth-guard.js";
import { createSuccess, isError } from "@repo/result";
import { getAccounts } from "../finance/repository/account/get-accounts.js";
import { db } from "~/db/index.js";
import { and, gt, eq } from "drizzle-orm";
import { accounts } from "~/db/schema.js";

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
