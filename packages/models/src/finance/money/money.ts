export type Money = {
  amount: string;
  accuracy: number;
  currency: Currency;
};

export type Currency =
  | "BTC"
  | "USD"
  | "USDT"
  | "ARS"
  | "RUB"
  | "DOT"
  | "ATOM"
  | "ETH"
  | "FLOKI"
  | "PEPE"
  | "W"
  | "ARB"
  | "HFT"
  | "GLMR"
  | "XRP"
  | "SOL"
  | "DOGE"
  | "TRX"
  | "ADA"
  | "TON";

export function createEmptyMoney(currency: Currency): Money {
  return {
    amount: "0",
    accuracy: 0,
    currency,
  };
}

export const Currencies: ReadonlyArray<Currency> = [
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
