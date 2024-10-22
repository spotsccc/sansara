import { db } from "~/db/index.js";
import type { UserWithPassword } from "../../model/index.js";
import { eq } from "drizzle-orm";
import { accessTokens } from "~/db/schema.js";

export async function getUserByAccessToken(
  accessToken: string,
): Promise<UserWithPassword | null> {
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
