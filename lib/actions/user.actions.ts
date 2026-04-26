"use server";
import {
  resendEmailSchema,
  signInSchema,
  signUpSchema,
  emailTokenSchema,
} from "../validators";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

import { getSafeCallbackUrl } from "../utils";

import { prisma } from "@/lib/prisma";
import { compareSync, hashSync } from "bcrypt-ts";
import { unstable_rethrow } from "next/navigation";
import {
  createVerificationTokenForEmail,
  getVerificationTokenByToken,
  deleteVerificationTokensByEmail,
  hasRecentVerificationToken,
} from "@/data/verification-token";
import { sendVerificationEmail } from "@/lib/email/send-verification-email";
import {
  GENERIC_VERIFICATION_MSG,
  SIGNUP_VERIFICATION_SENT_MSG,
  VERIFICATION_COOLDOWN_MS,
  VERIFY_ALREADY_DONE_MSG,
  VERIFY_LINK_INVALID_MSG,
  VERIFY_LINK_MISSING_MSG,
  VERIFY_SUCCESS_MSG,
} from "../constants";
import { getUserByEmail } from "@/data/user";

const getRedirectTo = (formdata: FormData) => {
  const rawCallback = formdata.get("callbackUrl");
  return getSafeCallbackUrl(typeof rawCallback === "string" ? rawCallback : null);
};

async function issueAndSendVerification({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const tooSoon = await hasRecentVerificationToken(email, VERIFICATION_COOLDOWN_MS);
  if (tooSoon) {
    return { ok: true as const, message: GENERIC_VERIFICATION_MSG };
  }
  const { rawToken } = await createVerificationTokenForEmail(email);
  const { error } = await sendVerificationEmail({
    to: email,
    name: name,
    token: rawToken,
  });
  if (error) {
    return {
      ok: false as const,
      message: "Failed to send email. Please try again later.",
    };
  }
  return { ok: true as const, message: GENERIC_VERIFICATION_MSG };
}

export async function SignInUser(_prev: unknown, formdata: FormData) {
  try {
    // get redirect path with safe callbackUrl

    const redirectTo = getRedirectTo(formdata);

    //convert formdata into plain object
    const data = Object.fromEntries(formdata.entries());

    //validate formdata with zod
    const result = signInSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { email, password } = result.data;
    //Block unverified user
    const user = await getUserByEmail(email);

    //if user account exists in the database and is unverified,
    if (user?.password && !user.emailVerified) {
      //then compare if password matches, if not match, indicate the user
      if (!compareSync(password, user.password)) {
        return { success: false, message: "The email or password is not correct" };
      }
      //if password matches, send an email verification
      const r = await issueAndSendVerification({
        email: user.email,
        name: user.name ?? "there",
      });
      return { success: r.ok, message: r.message };
    }

    //try to login in
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo,
    });

    //if success return success message
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof AuthError) {
      return { success: false, message: "The email or password is not correct" };
    }
    throw error;
  }
}

export async function SignUpUser(_prev: unknown, formdata: FormData) {
  try {
    //Zod schema validation before sign up
    const data = Object.fromEntries(formdata.entries());
    const result = signUpSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { name, email, password } = result.data;

    // check if user exists
    const existing = await prisma.user.findFirst({ where: { email } });

    //if user exists but already verified, then just send a generic message and return
    if (existing?.emailVerified) {
      return { success: true, message: GENERIC_VERIFICATION_MSG };
    }

    // if user does not exist, create user entry in the database
    if (!existing) {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashSync(password, 10),
        },
      });
    }

    //prioritize user name in the form submitted first, if none using existing user's name, if none use there
    const displayName = name ?? existing?.name ?? "there";
    const r = await issueAndSendVerification({ email, name: displayName });

    return { success: r.ok, message: r.ok ? SIGNUP_VERIFICATION_SENT_MSG : r.message };
  } catch (error) {
    //  throw error when redirect or not found happens
    unstable_rethrow(error);
    console.error(error);
    return {
      success: false,
      message: "We couldn't complete your request. Please try again",
    };
  }
}

export async function ResendVerificationAction(_prev: unknown, formdata: FormData) {
  try {
    const data = Object.fromEntries(formdata.entries());
    const parsed = resendEmailSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid email",
      };
    }
    const email = parsed.data.email;
    const user = await prisma.user.findFirst({ where: { email } });
    //if user does not exist or user has already been verified, just return a generic message
    if (!user || user.emailVerified) {
      return { success: true, message: GENERIC_VERIFICATION_MSG };
    }
    const r = await issueAndSendVerification({ email, name: user.name });
    return { success: r.ok, message: r.message };
  } catch (error) {
    unstable_rethrow(error);
    return {
      success: false,
      message: "We couldn't complete your request. Please try again",
    };
  }
}

// handle the "magic link"
export async function verifyEmailTokenAction(rawToken: string | undefined) {
  //handle invalid token
  const parsed = emailTokenSchema.safeParse({ token: rawToken });
  if (!parsed.success) {
    return { success: false, message: VERIFY_LINK_MISSING_MSG };
  }

  const record = await getVerificationTokenByToken(parsed.data.token);
  //handle no matched token
  if (!record) {
    return { success: false, message: VERIFY_LINK_INVALID_MSG };
  }
  //handle  matched token but expired
  if (record.expires < new Date()) {
    return { success: false, message: VERIFY_LINK_INVALID_MSG };
  }

  //find matched user with the identifier
  const user = await prisma.user.findUnique({
    where: { email: record.identifier },
  });
  if (!user) {
    return { success: false, message: VERIFY_LINK_INVALID_MSG };
  }

  //if verified already, indicate user to sign in
  if (user.emailVerified) {
    await deleteVerificationTokensByEmail(user.email);
    return {
      success: true,
      message: VERIFY_ALREADY_DONE_MSG,
    };
  }

  // update email verification, after the updating delete all the verification tokens belonged to the user
  await prisma.$transaction([
    prisma.user.update({
      where: { email: user.email },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.deleteMany({
      where: { identifier: user.email },
    }),
  ]);
  return { success: true, message: VERIFY_SUCCESS_MSG };
}

// sign user in with google
export async function signInWithGoogle(formData: FormData) {
  const redirectTo = getRedirectTo(formData);
  await signIn("google", { redirectTo });
}

//Sign out user
export async function SignoutUser() {
  await signOut({ redirectTo: "/" });
}
