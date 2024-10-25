import { createError, createSuccess } from "@repo/result";
import { hash } from "crypto";
import { getUserByEmail } from "~/modules/user/repositories/user/index.js";
import { saveAccessToken } from "../repositories/access-token/index.js";
import { toClientUser } from "~/modules/user/model/index.js";
export async function login(input) {
    const user = await getUserByEmail(input.email);
    if (user?.password !== hash("sha256", input.password)) {
        return createError({
            type: "wrong-email-or-password",
            message: "Wrong email or password",
        });
    }
    const token = await saveAccessToken(user.id);
    return createSuccess({
        user: toClientUser(user),
        token,
    });
}
