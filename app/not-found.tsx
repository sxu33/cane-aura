"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <Image
        src="/android-chrome-512x512.png"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />

      <div className="p-10 rounded-lg shadow-md w-full max-w-md text-center bg-card mt-6 border">
        <h1 className="h1-bold mb-4 text-primary">404</h1>
        <h2 className="h2-bold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved
          or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">Back to Home</Link>
          </Button>

          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground italic">
        &copy; {new Date().getFullYear()} {APP_NAME}
      </p>
    </div>
  );
}
