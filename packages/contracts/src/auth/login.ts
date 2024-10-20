import z, { typeToFlattenedError } from "zod";
import type { Result } from "@repo/result";
import type { AccessToken } from "@repo/models/auth";
import type { User } from "@repo/models/users";

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginInput>;

export type LoginOutput = Result<
  { token: AccessToken; user: User },
  | { type: LoginError; message: string }
  | { type: "validation-error"; errors: typeToFlattenedError<LoginInput> }
>;

export type LoginError = "wrong-email-or-password" | "internal-error";
