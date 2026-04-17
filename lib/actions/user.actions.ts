"use server";
import { signInSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

import { getSafeCallbackUrl } from "../utils";
import { redirect } from "next/dist/server/api-utils";

export async function SignInUser(_prev: unknown, formdata: FormData) {
  try {
    // get redirect path with safe callbackUrl
    const rawCallback = formdata.get("callbackUrl");
    const redirectTo = getSafeCallbackUrl(
      typeof rawCallback === "string" ? rawCallback : null
    );

    //convert formdata into plain object
    const data = Object.fromEntries(formdata.entries());

    //validate formdata with zod
    const result = signInSchema.safeParse(data);

    if (!result.success)
      return { success: false, message: "Invalid email or password format" };

    //try to login in
    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirectTo,
    });

    //if success return success message
    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "The email or password is not correct" };
    }
    throw error;
  }
}

export async function signInWithGoogle(formData: FormData) {
  try {
    const rawCallback = formData.get("callbackUrl");
    const redirectTo = getSafeCallbackUrl(
      typeof rawCallback === "string" ? rawCallback : null
    );
    await signIn("google", { redirectTo });
  } catch (error) {
    throw error;
  }
}

//Sign out user
export async function SignoutUser() {
  await signOut({ redirectTo: "/" });
}
