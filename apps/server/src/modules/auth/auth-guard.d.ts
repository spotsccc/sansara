import { type Context } from "hono";
import { type User } from "@repo/models/users";
export declare function authGuard(c: Context): Promise<import("@repo/result").RError<{
    type: string;
    message: string;
}> | import("@repo/result").Success<{
    user: import("../user/model/index.js").UserWithPassword;
}>>;
export declare function getUser(c: Context): Promise<User>;
//# sourceMappingURL=auth-guard.d.ts.map