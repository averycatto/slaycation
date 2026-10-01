import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Slaycation Exploring Horizons | Tanay Tourism Guide",
  description:
    "Discover Tanay, Rizal through Daranak Falls, Tinipak River, nature adventures, cultural experiences, and responsible tourism.",
  keywords: [
    "Tanay tourism",
    "Tanay Rizal",
    "Tanay tourist destinations",
    "Daranak Falls",
    "Tinipak River",
    "Rizal travel guide",
    "Tanay travel guide",
    "nature tourism in Tanay",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
