import { type User } from "@repo/models/users";
export type UserWithPassword = User & {
    password: string;
};
export declare function createUser({ password, email, username, }: {
    password: string;
    email: string;
    username: string;
}): UserWithPassword;
export declare function toClientUser(u: UserWithPassword): {
    email: string;
    id: string;
    username: string;
};
//# sourceMappingURL=index.d.ts.map