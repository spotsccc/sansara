import z from "zod";

export const moneySchema = z.object({
  amount: z.string(),
  accuracy: z.number(),
  currency: z.string(),
});

export type Money = z.infer<typeof moneySchema>;

export function createEmptyMoney(currency: string): Money {
  return {
    amount: "0",
    accuracy: 0,
    currency,
  };
}

export const Currencies = [
  "BTC",
  "USD",
  "USDT",
  "ARS",
  "RUB",
  "DOT",
  "ATOM",
  "ETH",
  "FLOKI",
  "PEPE",
  "W",
  "ARB",
  "HFT",
  "GLMR",
  "XRP",
  "SOL",
  "DOGE",
  "TRX",
  "ADA",
  "TON",
];
