import { prisma } from "@/lib/prisma";
import { createVerificationSecret, hashVerificationToken } from "@/lib/token";

// Read latest password reset token row for an email (identifier).
// Useful for debugging or resend flow checks.
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return await prisma.passwordResetToken.findFirst({
      where: { identifier: email },
    });
  } catch {
    return null;
  }
};

// Verify-link lookup: URL carries raw token, DB stores hashed token.
// So we hash raw token first, then query by unique token column.
export const getPasswordResetTokenByToken = async (rawToken: string) => {
  const hashedToken = hashVerificationToken(rawToken);
  try {
    return await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
    });
  } catch {
    return null;
  }
};

// Delete all token rows for one email.
// Called before creating a new token or after successful password reset.
export const deletePasswordResetTokensByEmail = async (email: string) => {
  try {
    return await prisma.passwordResetToken.deleteMany({
      where: { identifier: email },
    });
  } catch {
    return null;
  }
};

// Create a fresh token row for one email.
// Returns rawToken for email URL + DB row with hashed token.
export const createPasswordResetTokenForEmail = async (email: string) => {
  const { rawToken, hashedToken } = createVerificationSecret();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await deletePasswordResetTokensByEmail(email);

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  return { ...passwordResetToken, rawToken };
};

// cool down check: is there a token created within the cool down window?
export const hasRecentPasswordResetToken = async (
  email: string,
  coolDownMs: number
) => {
  const coolDownPoint = new Date(Date.now() - coolDownMs);
  try {
    const recent = await prisma.passwordResetToken.findFirst({
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
