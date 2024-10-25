export declare const accountsRelations: import("drizzle-orm").Relations<"accounts", {
    user: import("drizzle-orm").One<"users", true>;
    transactions: import("drizzle-orm").Many<"transactions">;
}>;
export declare const transactionsRelations: import("drizzle-orm").Relations<"transactions", {
    account: import("drizzle-orm").One<"accounts", true>;
    receiver: import("drizzle-orm").One<"accounts", false>;
    category: import("drizzle-orm").One<"categories", false>;
}>;
export declare const categoriesRelations: import("drizzle-orm").Relations<"categories", {
    transactions: import("drizzle-orm").Many<"transactions">;
}>;
//# sourceMappingURL=relations.d.ts.map