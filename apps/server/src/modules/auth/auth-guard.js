import { createError, createSuccess } from "@repo/result";
import { getCookie } from "hono/cookie";
import { getUserByAccessToken } from "../user/repositories/user";
export async function authGuard(c) {
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
export async function getUser(c) {
    const accessToken = getCookie(c, "access-token");
    const user = await getUserByAccessToken(accessToken);
    return user;
}
