import { type Account, Currencies } from "@repo/models/finance";
import { type Result } from "@repo/result";
import * as z from "zod";

const moneySchema = z.object({
  amount: z.string(),
  accuracy: z.number(),
  currency: z.enum(Currencies as readonly [string, ...string[]]),
});

export const accountSaveInput = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  defaultCurrency: z.string(),
  balance: z.record(moneySchema),
});

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
