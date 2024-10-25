import { saveUser } from "~/modules/user/repositories/user/index.js";
import { saveAccessToken } from "../repositories/access-token/index.js";
import { createError, createSuccess } from "@repo/result";
import { createUser, toClientUser } from "~/modules/user/model/index.js";
export async function register(input) {
    const user = createUser(input);
    try {
        const savedUser = await saveUser(user);
        const token = await saveAccessToken(savedUser.id);
        return createSuccess({ token, user: toClientUser(savedUser) });
    }
    catch (e) {
        if (e instanceof Error) {
            if (e.constraint === "users_email_unique") {
                return createError({
                    type: "email-already-exists",
                    message: "Email already exist",
                });
            }
            else if (e.constraint === "users_username_unique") {
                return createError({
                    type: "username-already-exists",
                    message: "Username already exist",
                });
            }
        }
        throw e;
    }
}
