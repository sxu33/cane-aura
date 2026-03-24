import type { Metadata } from "next";
import { EB_Garamond, Outfit } from "next/font/google";
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
      className={`${ebGaramond.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
