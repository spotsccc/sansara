import { db } from "~/db/index.js";
import { eq } from "drizzle-orm";
import { accessTokens } from "~/db/schema.js";
export async function getUserByAccessToken(accessToken) {
    const tokenWithUser = await db.query.accessTokens.findFirst({
        where: eq(accessTokens.token, accessToken),
        with: {
            user: true,
        },
    });
    if (!tokenWithUser) {
        return null;
    }
    return tokenWithUser.user;
}
