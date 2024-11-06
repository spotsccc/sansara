import { createError, createSuccess } from "@repo/result";
import { type Money } from "./money";

export const ERRORS = {
  notEnoughtFunds: "not-enought-funds" as const,
};

export function minus(current: Money, diff: Money) {
  if (current.accuracy > diff.accuracy) {
    const accuracyDiff = current.accuracy - diff.accuracy;

    const amount =
      BigInt(current.amount) - BigInt(diff.amount) * BigInt(10 ** accuracyDiff);

    if (amount < 0) {
      return createError({ type: ERRORS.notEnoughtFunds });
    }

    return createSuccess({
      accuracy: current.accuracy,
      currency: current.currency,
      amount: amount.toString(),
    });
  }

  const accuracyDiff = diff.accuracy - current.accuracy;

  const amount =
    BigInt(current.amount) * BigInt(10 ** accuracyDiff) - BigInt(diff.amount);

  if (amount < 0) {
    return createError({ type: ERRORS.notEnoughtFunds });
  }

  return createSuccess({
    accuracy: diff.accuracy,
    currency: current.currency,
    amount: amount.toString(),
  });
}
