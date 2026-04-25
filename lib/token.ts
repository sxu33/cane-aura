import { createHash, randomBytes } from "node:crypto";

// Generate a new raw token and its hash.
// rawToken is sent in email URL; hashedToken is stored in DB.
export const createVerificationSecret = () => {
  const rawToken = randomBytes(32).toString("hex");
  const hashedToken = createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, hashedToken };
};

// Hash raw token from URL before DB lookup.
export function hashVerificationToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}
