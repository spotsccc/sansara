import { db } from "~/db";
import { UserWithPassword } from "../../model";

export async function getUserByAccessToken(
  accessToken: string,
): Promise<UserWithPassword | null> {
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
