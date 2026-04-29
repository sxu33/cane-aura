"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { RequestPasswordResetAction } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl py-7 font-bold shadow-lg shadow-primary/10 transition-all active:scale-[0.98]"
    >
      {pending ? (
        <span className="flex-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Sending Link...
        </span>
      ) : (
        "Send reset link"
      )}
    </Button>
  );
}

export default function ForgotPasswordRequestForm() {
  const [data, action] = useActionState(RequestPasswordResetAction, {
    success: false,
    message: "",
  });

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-3">
        <Label
          htmlFor="email"
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80 ml-1"
        >
          Enter your registered email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          className="rounded-xl border-border bg-background py-6 focus-visible:ring-primary/10"
        />
      </div>

      {!!data.message && (
        <div
          className={`rounded-lg p-3 text-center text-sm font-medium animate-in fade-in slide-in-from-top-1 ${
            data.success
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {data.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
