import { resend } from "@/lib/email/client";
import { VerificationEmail } from "@/components/email/verification-email";
import { SERVER_URL, SENDER_EMAIL } from "@/lib/constants";

type SendVerificationEmailParams = {
  to: string;
  name: string;
  token: string; // raw token from createVerificationSecret
};

export async function sendVerificationEmail({
  to,
  name,
  token,
}: SendVerificationEmailParams) {
  const confirmUrl = `${SERVER_URL}/verify-email?token=${encodeURIComponent(token)}`;

  return resend.emails.send({
    from: SENDER_EMAIL,
    to: [to],
    subject: "Verify your email",
    react: VerificationEmail({ name, url: confirmUrl }),
  });
}
