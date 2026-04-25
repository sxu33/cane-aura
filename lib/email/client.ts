import { Resend } from "resend";

// Validate that the API key is configured
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY");
}
export const resend = new Resend(apiKey);
