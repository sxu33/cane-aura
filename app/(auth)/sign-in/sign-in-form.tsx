"use client";

import { useActionState } from "react";
import { SignInUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import Link from "next/link";

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
const SignInForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const [data, action] = useActionState(SignInUser, { success: false, message: "" });

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl}></input>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>

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

      {!!data.message && (
        <div
          className={`flex-center gap-2 rounded-xl p-3 border animate-in fade-in zoom-in duration-300 ${
            data.success
              ? "bg-primary/5 text-primary border-primary/10"
              : "bg-destructive/5 text-destructive border-destructive/10"
          }`}
        >
          <span className="text-base font-semibold leading-tight">{data.message}</span>
        </div>
      )}

      {/* Resend Link Section */}
      <div className="text-center space-y-2">
        <p className="text-base text-muted-foreground">
          Didn&apos;t receive the email?{" "}
          <Link
            href="/verify-email/request"
            className="font-bold text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            Resend link
          </Link>
        </p>
      </div>

      <SubmitButton />
    </form>
  );
};

export default SignInForm;
