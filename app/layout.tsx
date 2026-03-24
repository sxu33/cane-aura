import type { Metadata } from "next";
import { EB_Garamond, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    template: "%s | Cane Aura",
    default: "Cane Aura — Handcrafted Bamboo Artistry",
  },
  description:
    "Authentic handwoven bamboo crafts rooted in centuries-old Chinese heritage. Designed for modern living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", ebGaramond.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
