import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import SignUpForm from "./sign-up-form";
import { getSafeCallbackUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const safeUrl = getSafeCallbackUrl(callbackUrl);

  return (
    // Main container using the theme background
    <div className="min-h-screen w-full bg-background flex flex-col md:flex-row">
      {/* Left: Branding Image (Hidden on mobile) */}
      <div className="relative hidden md:block md:w-1/2 lg:w-3/5">
        <Image
          src="/images/products/assorted-baskets.jpg"
          alt="Cane Aura Lifestyle"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay using primary brand color */}
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px]" />
      </div>

      {/* Right: Auth Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex-center p-6 md:p-12">
        <div className="w-full max-w-[400px] space-y-6">
          {/* Brand Logo - Reusing flex-start & serif font */}
          <Link href="/" className="flex-start gap-3 group">
            <Image
              src="/android-chrome-512x512.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full transition-transform duration-500 group-hover:rotate-12 font-serif"
            />
            <span className="font-serif text-3xl font-bold text-primary tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Login Card - Reusing Shadcn Card structure */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-4 space-y-2">
              <CardTitle className="h1-bold text-foreground leading-tight">
                Create Your Account
              </CardTitle>
              <CardDescription className="font-sans text-sm text-muted-foreground">
                Discover the aura of handcrafted natural living.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-6">
              {/* sign up Form */}
              <SignUpForm callbackUrl={safeUrl} />
            </CardContent>
          </Card>

          {/* Footer - Link to Sign Up */}
          <footer className="flex-center gap-1 text-sm font-sans pt-4 border-t border-border/50">
            <span className="text-muted-foreground">Already have an account?</span>
            <Link
              href="/sign-in"
              className="font-bold text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
