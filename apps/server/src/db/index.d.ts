import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";
export declare let db: NodePgDatabase<typeof schema>;
export declare function initializeDatabase(): void;
//# sourceMappingURL=index.d.ts.map