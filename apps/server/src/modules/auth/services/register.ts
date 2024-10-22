import type { RegisterInput, RegisterOutput } from "@repo/contracts/auth";
import { saveUser } from "~/modules/user/repositories/user/index.js";
import { saveAccessToken } from "../repositories/access-token/index.js";
import { createError, createSuccess } from "@repo/result";
import { createUser, toClientUser } from "~/modules/user/model/index.js";

export async function register(input: RegisterInput): Promise<RegisterOutput> {
  const user = createUser(input);
  try {
    const savedUser = await saveUser(user);
    const token = await saveAccessToken(savedUser.id!);

    return createSuccess({ token, user: toClientUser(savedUser) });
  } catch (e) {
    if (e instanceof Error) {
      if ((e as any).constraint === "users_email_unique") {
        return createError({
          type: "email-already-exists" as const,
          message: "Email already exist",
        });
      } else if ((e as any).constraint === "users_username_unique") {
        return createError({
          type: "username-already-exists" as const,
          message: "Username already exist",
        });
      }
    }
    throw e;
  }
}
