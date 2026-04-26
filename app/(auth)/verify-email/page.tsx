import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { verifyEmailTokenAction } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = await verifyEmailTokenAction(token);

  return (
    <main className="min-h-screen w-full bg-background flex-center p-6 text-center font-sans">
      <section className="w-full max-w-md space-y-8">
        <div className="flex-center flex-col gap-4">
          <Image
            src="/android-chrome-512x512.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          {result.success ? (
            <CheckCircle2
              className="size-12 text-primary animate-in zoom-in duration-500"
              strokeWidth={1.5}
            />
          ) : (
            <AlertCircle
              className="size-12 text-destructive animate-in shake duration-500"
              strokeWidth={1.5}
            />
          )}
        </div>

        <div className="space-y-3">
          <h1 className="h1-bold">
            {result.success ? "Email Verified" : "Verification Failed"}
          </h1>
          <p className="text-muted-foreground text-sm max-w-[300px] mx-auto leading-relaxed">
            {result.message}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            asChild
            className="rounded-xl py-6 font-bold shadow-lg shadow-primary/10"
          >
            <Link href={result.success ? "/sign-in" : "/verify-email/request"}>
              {result.success ? "Go to Sign In" : "Request New Link"}
            </Link>
          </Button>

          {!result.success && (
            <Link
              href="/"
              className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Return to Home
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
