"use client";

import { useActionState } from "react";
import { SignUpUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20"
    >
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}
const SignUpForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const [data, action] = useActionState(SignUpUser, { success: false, message: "" });

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <input type="hidden" name="callbackUrl" value={callbackUrl}></input>
        <Input
          name="name"
          id="name"
          type="text"
          autoComplete="name"
          required
          className="rounded-xl"
        />
      </div>

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
        </div>
        <Input
          name="password"
          id="password"
          type="password"
          autoComplete="new-password"
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
        </div>
        <Input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
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

export default SignUpForm;
