import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/src/i18n/context";
import "./globals.css";

const inter = Inter({
  variable: "--Family-Heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeenCare - Personalized Plan",
  description:
    "Get your personalized parenting plan to help you build better connections and communicate effectively with your teens.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
