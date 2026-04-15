"use server";
import { signInSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

function safeCallbackUrl(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || value.length === 0) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export async function SignInUser(_prev: unknown, formdata: FormData) {
  try {
    // get redirect path with safe callbackUrl
    console.log(formdata);
    const redirectTo = safeCallbackUrl(formdata.get("callbackUrl"));

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

//Sign out user
export async function SignoutUser() {
  await signOut();
}
