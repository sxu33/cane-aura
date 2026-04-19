"use server";
import { signInSchema, signUpSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

import { getSafeCallbackUrl } from "../utils";

import { prisma } from "@/lib/prisma";
import { hashSync } from "bcrypt-ts";
import { unstable_rethrow } from "next/navigation";

const getRedirectTo = (formdata: FormData) => {
  const rawCallback = formdata.get("callbackUrl");
  return getSafeCallbackUrl(typeof rawCallback === "string" ? rawCallback : null);
};

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
    const redirectTo = getRedirectTo(formdata);

    const data = Object.fromEntries(formdata.entries());
    const result = signUpSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0]?.message ?? "Invalid input",
      };
    }

    // check if user exist
    const userExists = await prisma.user.findFirst({
      where: { email: result.data.email },
    });
    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    // create user entry in the database
    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashSync(result.data.password, 10),
      },
    });

    // auto login in
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    //  throw error when successfully logged in
    unstable_rethrow(error);
    return { success: false, message: "Something went wrong" };
  }
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
