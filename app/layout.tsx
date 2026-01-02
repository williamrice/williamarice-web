import Footer from "@/components//Footer";
import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "@/components/auth-helpers/NextAuthProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";
import ConditionalNavBar from "@/components/ConditionalNavBar";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://williamarice.com'),
  title: {
    default: 'William Rice - Software Developer | Lexington, KY',
    template: '%s | William Rice'
  },
  description: 'Full-stack software developer in Lexington, KY building web applications and software solutions across various technology stacks.',
  keywords: [
    'software developer lexington ky',
    'full-stack developer kentucky',
    'react developer',
    'next.js developer',
    'web development lexington ky',
    'node.js developer',
    'typescript developer',
    'postgresql developer'
  ],
  openGraph: {
    title: 'William Rice - Software Developer',
    description: 'Full-stack software developer portfolio featuring web applications and software solutions.',
    url: 'https://williamarice.com',
    siteName: 'William Rice Portfolio',
    images: [
      {
        url: '/images/william_headshot_500x500.jpg',
        width: 500,
        height: 500,
        alt: 'William Rice - Software Developer'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
twitter: {
    title: 'William Rice - Software Developer',
    description: 'Full-stack software developer portfolio featuring web applications and software solutions.',
    images: ['/images/william_headshot_500x500.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
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
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Skip to main content
        </a>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen items-center justify-center">
            <header>
              <ConditionalNavBar />
            </header>
            <main id="main-content" className="mb-auto h-full w-full" tabIndex={-1}>
              {children}
            </main>
            <footer>
              <Toaster />
              <Footer />
            </footer>
          </div>
        </NextAuthProvider>
      </body>
      <GoogleAnalytics gaId="G-Y46TG9779R" />
    </html>
  );
}
