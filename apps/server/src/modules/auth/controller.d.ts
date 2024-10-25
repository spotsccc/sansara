import { Hono } from "hono";
export declare const authController: Hono<import("hono/types").BlankEnv, {
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
}, "/">;
//# sourceMappingURL=controller.d.ts.map