import type { Metadata } from "next";
import { EB_Garamond, Outfit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
