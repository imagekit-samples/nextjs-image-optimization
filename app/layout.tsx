import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ImageKitProvider } from "@imagekit/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Image Optimization Demo",
  description:
    "Companion demo for the ImageKit Image Optimization blog — format conversion, compression, smart crop, and AI transforms with real numbers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ImageKitProvider urlEndpoint={urlEndpoint!}>{children}</ImageKitProvider>
      </body>
    </html>
  );
}
