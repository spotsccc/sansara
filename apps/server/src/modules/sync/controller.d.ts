import { Hono } from "hono";
export declare const syncController: Hono<import("hono/types").BlankEnv, {
    "/load": {
        $get: {
            input: {};
            output: {
                readonly tag: "error";
                readonly error: {
                    type: string;
                    message: string;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        } | {
            input: {};
            output: {
                readonly tag: "success";
                readonly success: {
                    accounts: {
                        id: string;
                        balance: {
                            BTC: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            USD: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            USDT: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            ARS: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            RUB: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            DOT: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            ATOM: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            ETH: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            FLOKI: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            PEPE: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            W: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            ARB: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            HFT: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            GLMR: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            XRP: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            SOL: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            DOGE: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            TRX: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            ADA: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                            TON: {
                                amount: string;
                                accuracy: number;
                                currency: import("@repo/models/finance").Currency;
                            };
                        };
                        defaultCurrency: import("@repo/models/finance").Currency;
                        name: string;
                        userId: string;
                    }[];
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/get-updates": {
        $get: {
            input: {};
            output: {
                readonly tag: "error";
                readonly error: {
                    type: string;
                    message: string;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        } | {
            input: {};
            output: {
                readonly tag: "success";
                readonly success: {
                    accs: {
                        id: string;
                        name: string;
                        userId: string;
                        balance: never;
                        defaultCurrency: string;
                        updatedAt: string;
                    }[];
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}, "/">;
//# sourceMappingURL=controller.d.ts.map