import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import ResendVerificationForm from "./resend-verification-form";

export const metadata: Metadata = {
  title: `${APP_NAME} | Verify your email`,
};

export default function RequestVerifyEmailPage() {
  return (
    <main className="min-h-screen w-full bg-background flex-center p-6">
      <Card className="w-full max-w-[450px] border-none shadow-none bg-transparent">
        <CardHeader className="flex flex-col items-center space-y-4 text-center">
          <Link href="/" className="group mb-2">
            <Image
              src="/android-chrome-512x512.png"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full transition-transform group-hover:rotate-12"
            />
          </Link>

          <CardTitle className="h1-bold text-3xl text-foreground">
            Verify Your <span className="text-primary italic">Aura</span>
          </CardTitle>
          <CardDescription className="font-sans text-muted-foreground leading-relaxed">
            Enter your email below. We&apos;ll send a fresh link to ensure your
            connection to {APP_NAME} is secure.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <ResendVerificationForm />

          <div className="mt-8 text-center border-t border-border/50 pt-6">
            <Link
              href="/sign-in"
              className="text-sm font-bold text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
