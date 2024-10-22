import { db } from "~/db";
import dayjs from "dayjs";
import { accessTokens } from "../../schemas/access-tokens";
import { type AccessToken } from "@repo/models/auth";

export async function saveAccessToken(userId: string): Promise<AccessToken> {
  const accessToken = (
    await db
      .insert(accessTokens)
      .values({
        userId,
        expiresAt: dayjs().add(1, "y").toISOString(),
      })
      .returning()
  )[0];

  return accessToken;
}
