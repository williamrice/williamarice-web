import Navbar from "@/components//NavBar";
import Footer from "@/components//Footer";
import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "@/components/auth-helpers/NextAuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "William Rice",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <NextAuthProvider>
            <Navbar fixed={true} />

            <div className="flex flex-col min-h-screen items-center justify-center">
              <main className="mb-auto h-full w-full">{children}</main>
              <div className="h-[150px] w-full clear-both"></div>
              <Footer />
            </div>
          </NextAuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
