import Footer from "@/components//Footer";
import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "@/components/auth-helpers/NextAuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";
import ConditionalNavBar from "@/components/ConditionalNavBar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "William Rice",
  description: "William Rice - Software Developer - Lexington, KY",
  keywords:
    "software developer lexington ky, web developer lexington ky, web design lexington ky, website design lexington ky",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
          strategy="afterInteractive"
        />
      </head>
      <body className="h-screen w-full">
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen items-center justify-center">
            <ConditionalNavBar />
            <main className="mb-auto h-full w-full">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
      <GoogleAnalytics gaId="G-Y46TG9779R" />
    </html>
  );
}
