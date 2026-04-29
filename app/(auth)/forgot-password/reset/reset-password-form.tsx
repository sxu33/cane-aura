"use client";

import { useActionState } from "react";
import { ResetPasswordAction } from "@/lib/actions/user.actions";
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
      {pending ? "Updating..." : "Update Password"}
    </Button>
  );
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const [data, action] = useActionState(ResetPasswordAction, {
    success: false,
    message: "",
  });

  if (data.success) {
    return (
      <div className="flex flex-col gap-3 pt-4">
        {!!data.message && (
          <p className="text-sm text-muted-foreground">{data.message}</p>
        )}
        <Button
          asChild
          className="rounded-xl py-6 font-bold shadow-lg shadow-primary/10"
        >
          <Link href="/sign-in">Go to Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4 text-left">
      <input type="hidden" name="token" value={token} readOnly />

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          name="password"
          id="password"
          type="password"
          autoComplete="new-password"
          className="rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="rounded-xl"
        />
      </div>

      {!!data.message && (
        <div
          className={`rounded-xl p-3 border text-left animate-in fade-in zoom-in duration-300 ${
            data.success
              ? "bg-primary/5 text-primary border-primary/10"
              : "bg-destructive/5 text-destructive border-destructive/10"
          }`}
        >
          <ul className="m-0 list-none space-y-2 p-0">
            {data.message
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line, i) => (
                <li
                  key={`${i}-${line.slice(0, 24)}`}
                  className="flex gap-2.5 text-sm font-normal leading-relaxed"
                >
                  <span
                    className={`mt-2 size-1.5 shrink-0 rounded-full ${
                      data.success ? "bg-primary" : "bg-destructive"
                    }`}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
