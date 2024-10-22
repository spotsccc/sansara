import { db } from "~/db";
export async function getUserByAccessToken(accessToken) {
    const tokenWithUser = await db.query.accessTokens.findFirst({
        where: ({ token }, { eq }) => eq(token, accessToken),
        with: {
            user: true,
        },
    });
    if (!tokenWithUser) {
        return null;
    }
    return tokenWithUser.user;
}
