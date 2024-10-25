import { db } from "~/db/index.js";
import dayjs from "dayjs";
import { accessTokens } from "../../schemas/access-tokens.js";
export async function saveAccessToken(userId) {
    const accessToken = (await db
        .insert(accessTokens)
        .values({
        userId,
        expiresAt: dayjs().add(1, "y").toISOString(),
    })
        .returning())[0];
    return accessToken;
}
