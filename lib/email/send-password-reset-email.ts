import { resend } from "@/lib/email/client";
import { PasswordResetEmail } from "@/components/email/password-reset-email";
import { SERVER_URL, SENDER_EMAIL } from "@/lib/constants";

type SendPasswordResetEmailParams = {
  to: string;
  name: string;

  token: string;
};

export async function sendPasswordResetEmail({
  to,
  name,
  token,
}: SendPasswordResetEmailParams) {
  const confirmUrl = `${SERVER_URL}/forgot-password/reset/?token=${encodeURIComponent(token)}`;

  return resend.emails.send({
    from: SENDER_EMAIL,
    to: [to],
    subject: "Reset your password",
    react: PasswordResetEmail({ name, url: confirmUrl }),
  });
}
