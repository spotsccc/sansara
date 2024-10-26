import { db } from "~/db";
import type { UserWithPassword } from "../../model";
import { eq } from "drizzle-orm";
import { accessTokens } from "~/db/schema";

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
