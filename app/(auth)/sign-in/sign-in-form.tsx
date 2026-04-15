"use client";

import { useActionState } from "react";
import { SignInUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20"
    >
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}
const SignInForm = () => {
  const [data, action] = useActionState(SignInUser, { success: false, message: "" });

  //get callbackUrl from the url
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <input type="hidden" name="callbackUrl" value={callbackUrl}></input>
        <Input
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs font-bold text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          name="password"
          id="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-xl"
        />
      </div>

      {!!data.message && !data.success && (
        <p className="text-destructive text-sm text-center font-medium">
          {data.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
};

export default SignInForm;
