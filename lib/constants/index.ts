export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Cane Aura";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Authentic handwoven bamboo crafts rooted in centuries-old Chinese heritage. Designed for modern living.";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

/** Shared: anti-enumeration + cooldown — email verification & password reset. */
export const GENERIC_VERIFICATION_MSG =
  "If an account exists for this email, we've sent a link. Check your inbox and spam folder.";

/** Shared: after signup when a confirm-email link was sent (same tone as generic). */
export const SIGNUP_VERIFICATION_SENT_MSG =
  "We sent a link to your email. Please check your inbox.";
export const VERIFICATION_COOLDOWN_MS = 60 * 1000;

/** Shared: invalid / expired / used magic link — verify-email page & forgot-password reset. */
export const VERIFY_LINK_INVALID_MSG =
  "This link is invalid, has expired, or has already been used. Go back to where you started and request a new one.";

/** Shared: bad or missing token in URL — verify-email & forgot-password reset. */
export const VERIFY_LINK_MISSING_MSG =
  "This link is missing or incomplete. Open the link from your latest email, or go back and request a new one.";

export const VERIFY_SUCCESS_MSG = "Your email is verified. You can sign in now.";

export const VERIFY_ALREADY_DONE_MSG =
  "This email is already verified. You can sign in.";
