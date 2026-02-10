import { getAuth } from "@clerk/express";

export const getGithunToken = (req: any): string | null => {
  const { sessionClaims } = getAuth(req);

  return (sessionClaims?.oauth_access_token as string) || null;
};

