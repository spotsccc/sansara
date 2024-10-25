import { type Transaction } from "@repo/models/finance";
export declare function applyTransactionService(transaction: Transaction): Promise<import("@repo/result").Success<import("@repo/models/finance").Account> | import("@repo/result").RError<{
    message: string;
}> | import("@repo/result").RError<{
    type: string;
}>>;
//# sourceMappingURL=transaction-applier.d.ts.map