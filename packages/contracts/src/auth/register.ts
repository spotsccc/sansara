import z, { typeToFlattenedError } from "zod";
import type { Result } from "@repo/result";
import type { AccessToken } from "@repo/models/auth";
import type { User } from "@repo/models/users";

export const registerInput = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(1),
    repeatPassword: z.string().min(8),
  })
  .refine(
    ({ password, repeatPassword }) => {
      return password === repeatPassword;
    },
    {
      message: "Password and repeat password are not same",
      path: ["password"],
    },
  );

export type RegisterInput = z.infer<typeof registerInput>;

export type RegisterOutput = Result<
  { token: AccessToken; user: User },
  | { type: RegisterError; message: string }
  | { type: "validation-error"; errors: typeToFlattenedError<RegisterInput> }
>;

export type RegisterError =
  | "username-already-exists"
  | "email-already-exists"
  | "internal-error";
