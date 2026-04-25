export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Cane Aura";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Authentic handwoven bamboo crafts rooted in centuries-old Chinese heritage. Designed for modern living.";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
export const GENERIC_VERIFICATION_MSG =
  "If an account exists for this email, a verification link has been sent.";

export const VERIFICATION_COOLDOWN_MS = 60 * 1000;
export const VERIFY_LINK_INVALID_MSG =
  "This verification link is invalid, has expired, or has already been used. Please request a new verification email from the sign-up page.";

export const VERIFY_LINK_MISSING_MSG =
  "This verification link is missing or incomplete. Please open the link from your latest email, or request a new verification email.";

export const VERIFY_SUCCESS_MSG = "Your email is verified. You can sign in now.";

export const VERIFY_ALREADY_DONE_MSG =
  "This email is already verified. You can sign in.";
