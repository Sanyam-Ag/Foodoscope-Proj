import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlavorFit AI — AI-Powered Personalized Nutrition",
  description:
    "Discover personalized recipes, smart diet plans, and AI-powered nutrition insights tailored to your health goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased bg-background text-main`}
      >
        {children}
      </body>
    </html>
  );
}
