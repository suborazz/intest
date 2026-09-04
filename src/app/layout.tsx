import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { AppThemeProvider } from "@/x/8db6cd59";
import { QueryProvider } from "@/x/2b49e7d9";
import { Toaster } from "@/x/118729fc";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "International Institute of Internship™ | Global Internship Platform",
    template: "%s | International Institute of Internship™",
  },
  description: "Empowering students worldwide with top-tier virtual and on-campus international internships. Join the International Institute of Internship™ to accelerate your career.",
  keywords: ["internship", "international internship", "virtual internship", "on-campus internship", "global career", "student placement", "industry training"],
  authors: [{ name: "International Institute of Internship" }],
  creator: "International Institute of Internship",
  publisher: "International Institute of Internship",
  metadataBase: new URL("https://iiinternship.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "International Institute of Internship™",
    description: "Empowering students worldwide with top-tier virtual and on-campus international internships.",
    url: "https://iiinternship.in",
    siteName: "International Institute of Internship™",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/header-logo.png",
        width: 800,
        height: 600,
        alt: "International Institute of Internship Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "International Institute of Internship™",
    description: "Empowering students worldwide with top-tier virtual and on-campus international internships.",
    images: ["/header-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }


import { TopProgressBar } from "@/x/TopProgressBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AppThemeProvider>
          <TopProgressBar />
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryProvider>
          <Toaster richColors closeButton />
        </AppThemeProvider>
      </body>
    </html>
  );
}
