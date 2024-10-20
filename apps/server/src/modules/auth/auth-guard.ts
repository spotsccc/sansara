import { createError, createSuccess } from "@repo/result";
import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { getUserByAccessToken } from "../user/repositories/user";
import { User } from "@repo/models/users";

export async function authGuard(c: Context) {
  const accessToken = getCookie(c, "access-token");
  if (!accessToken) {
    return createError({
      type: "unauthorized",
      message: "Has no access token",
    });
  }
  const user = await getUserByAccessToken(accessToken);

  if (!user) {
    return createError({ type: "unauthorized", message: "User not found" });
  }

  return createSuccess({ user });
}

export async function getUser(c: Context): Promise<User> {
  const accessToken = getCookie(c, "access-token")!;

  const user = await getUserByAccessToken(accessToken);

  return user!;
}
