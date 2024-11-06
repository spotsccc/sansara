import { accountSchema, type Account } from "@repo/models/finance";
import { type Result } from "@repo/result";
import * as z from "zod";

export const accountSaveInput = accountSchema;

export type AccountSaveOutput = Result<
  Account,
  | {
      type: "validation-error";
      errors: z.typeToFlattenedError<typeof accountSaveInput>;
    }
  | {
      type: "account-save-error";
      message: string;
    }
  | {
      type: "unauthorized";
    }
  | {
      type: "access-denied";
    }
>;

export type AccountSaveInput = Account;
