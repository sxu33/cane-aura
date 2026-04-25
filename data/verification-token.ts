import { prisma } from "@/lib/prisma";
import { createVerificationSecret, hashVerificationToken } from "@/lib/token";

// Read latest verification token row for an email (identifier).
// Useful for debugging or resend flow checks.
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { identifier: email },
    });
  } catch {
    return null;
  }
};

// Verify-link lookup: URL carries raw token, DB stores hashed token.
// So we hash raw token first, then query by unique token column.
export const getVerificationTokenByToken = async (rawToken: string) => {
  const hashedToken = hashVerificationToken(rawToken);
  try {
    return await prisma.verificationToken.findUnique({
      where: { token: hashedToken },
    });
  } catch {
    return null;
  }
};

// Delete all token rows for one email.
// Called before creating a new token or after successful verification.
export const deleteVerificationTokensByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });
  } catch {
    return null;
  }
};

// Create a fresh token row for one email.
// Returns rawToken for email URL + DB row with hashed token.
export const createVerificationTokenForEmail = async (email: string) => {
  const { rawToken, hashedToken } = createVerificationSecret();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await deleteVerificationTokensByEmail(email);

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  return { ...verificationToken, rawToken };
};

// cool down check: is there a token created within the cool down window?
export const hasRecentVerificationToken = async (email: string, coolDownMs: number) => {
  const coolDownPoint = new Date(Date.now() - coolDownMs);
  try {
    const recent = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        createdAt: { gt: coolDownPoint },
      },
      select: { token: true },
    });
    return !!recent;
  } catch {
    return false;
  }
};
