declare const app: import("hono/hono-base").HonoBase<{}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/register": {
        $post: {
            input: {
                json: {
                    password: string;
                    email: string;
                    username: string;
                    repeatPassword: string;
                };
            };
            output: {
                readonly tag: "success";
                readonly success: {
                    token: {
                        token: string;
                        userId: string;
                        expiresAt: string;
                    };
                    user: {
                        id: string;
                        username: string;
                        email: string;
                    };
                };
            } | {
                readonly tag: "error";
                readonly error: {
                    type: import("@repo/contracts/auth").RegisterError;
                    message: string;
                } | {
                    type: "validation-error";
                    errors: {
                        formErrors: string[];
                        fieldErrors: {
                            password?: string[] | undefined;
                            email?: string[] | undefined;
                            username?: string[] | undefined;
                            repeatPassword?: string[] | undefined;
                        };
                    };
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/login": {
        $post: {
            input: {
                json: {
                    password: string;
                    email: string;
                };
            };
            output: {
                readonly tag: "success";
                readonly success: {
                    token: {
                        token: string;
                        userId: string;
                        expiresAt: string;
                    };
                    user: {
                        id: string;
                        username: string;
                        email: string;
                    };
                };
            } | {
                readonly tag: "error";
                readonly error: {
                    type: import("@repo/contracts/auth").LoginError;
                    message: string;
                } | {
                    type: "validation-error";
                    errors: {
                        formErrors: string[];
                        fieldErrors: {
                            password?: string[] | undefined;
                            email?: string[] | undefined;
                        };
                    };
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}, "auth"> | import("hono/types").MergeSchemaPath<{
    "/accounts": {
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
    "/accounts/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                readonly tag: "error";
                readonly error: {
                    message: string;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                readonly tag: "success";
                readonly success: {
                    account: {
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
                    };
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/accounts/:id/transactions": {
        $post: {
            input: {
                json: import("@repo/models/finance").Transaction;
            } & {
                param: {
                    id: string;
                };
            };
            output: {
                readonly tag: "success";
                readonly success: {
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
                };
            } | {
                readonly tag: "error";
                readonly error: {
                    message: string;
                };
            } | {
                readonly tag: "error";
                readonly error: {
                    type: string;
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/accounts": {
        $post: {
            input: {
                json: {
                    id: string;
                    name: string;
                    userId: string;
                    balance: Record<string, {
                        amount: string;
                        accuracy: number;
                        currency: string;
                    }>;
                    defaultCurrency: string;
                };
            };
            output: {
                readonly tag: "success";
                readonly success: {
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
                };
            } | {
                readonly tag: "error";
                readonly error: {
                    type: "validation-error";
                    errors: {
                        formErrors: string[];
                        fieldErrors: {
                            strip?: string[] | undefined;
                            _output?: string[] | undefined;
                            _input?: string[] | undefined;
                            refinement?: string[] | undefined;
                            array?: string[] | undefined;
                            promise?: string[] | undefined;
                            brand?: string[] | undefined;
                            default?: string[] | undefined;
                            description?: string[] | undefined;
                            catch?: string[] | undefined;
                            isNullable?: string[] | undefined;
                            passthrough?: string[] | undefined;
                            strict?: string[] | undefined;
                            _def?: string[] | undefined;
                            catchall?: string[] | undefined;
                            shape?: string[] | undefined;
                            _getCached?: string[] | undefined;
                            _parse?: string[] | undefined;
                            nonstrict?: string[] | undefined;
                            extend?: string[] | undefined;
                            augment?: string[] | undefined;
                            merge?: string[] | undefined;
                            setKey?: string[] | undefined;
                            pick?: string[] | undefined;
                            omit?: string[] | undefined;
                            deepPartial?: string[] | undefined;
                            partial?: string[] | undefined;
                            required?: string[] | undefined;
                            keyof?: string[] | undefined;
                            _type?: string[] | undefined;
                            _getType?: string[] | undefined;
                            _getOrReturnCtx?: string[] | undefined;
                            _processInputParams?: string[] | undefined;
                            _parseSync?: string[] | undefined;
                            _parseAsync?: string[] | undefined;
                            parse?: string[] | undefined;
                            safeParse?: string[] | undefined;
                            parseAsync?: string[] | undefined;
                            safeParseAsync?: string[] | undefined;
                            spa?: string[] | undefined;
                            refine?: string[] | undefined;
                            _refinement?: string[] | undefined;
                            superRefine?: string[] | undefined;
                            optional?: string[] | undefined;
                            nullable?: string[] | undefined;
                            nullish?: string[] | undefined;
                            or?: string[] | undefined;
                            and?: string[] | undefined;
                            transform?: string[] | undefined;
                            describe?: string[] | undefined;
                            pipe?: string[] | undefined;
                            readonly?: string[] | undefined;
                            isOptional?: string[] | undefined;
                        };
                    };
                } | {
                    type: "account-save-error";
                    message: string;
                } | {
                    type: "unauthorized";
                } | {
                    type: "access-denied";
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}, "finance"> | import("hono/types").MergeSchemaPath<{
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
}, "sync">, "/">;
export type AppType = typeof app;
export {};
//# sourceMappingURL=index.d.ts.map