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
import SignInForm from "./sign-in-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage() {
  return (
    // Main container using your theme background
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
                Sign In to <span className="text-primary italic">Nature</span>
              </CardTitle>
              <CardDescription className="font-sans text-sm text-muted-foreground">
                Discover the aura of handcrafted natural living.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-6">
              {/* Core Authentication Form */}
              <SignInForm />

              {/* Divider - Reusing flex-center & brand spacing */}
              <div className="relative flex-center py-2">
                <span className="w-full border-t border-border"></span>
                <span className="absolute bg-background px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  or continue with
                </span>
              </div>

              {/* OAuth Providers */}
              <div className="grid grid-cols-2 gap-4 font-sans">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-center gap-2 rounded-xl py-6"
                  // onClick={() => signIn('google')}
                >
                  <Image src="/google.svg" width={18} height={18} alt="Google" />
                  Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-center gap-2 rounded-xl py-6"
                  // onClick={() => signIn('apple')}
                >
                  <Image src="/apple.svg" width={18} height={18} alt="Apple" />
                  Apple
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer - Link to Sign Up */}
          <footer className="flex-center gap-1 text-sm font-sans pt-4 border-t border-border/50">
            <span className="text-muted-foreground">Don&apos;t have an account?</span>
            <Link
              href="/sign-up"
              className="font-bold text-primary hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Sign up now
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
