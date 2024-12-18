import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";

import { Manrope } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landver Application | Onchain Land Management",
  description:
    "Landver is a blockchain-powered land management platform offering secure and transparent land registration and ownership verification.",
  icons: {
    icon: "/images/LANDVER_BLACK.svg", 
    apple: "/images/LANDVER_BLACK.svg", 
  },
  openGraph: {
    title: "Landver Application",
    description:
      "Experience next-generation on-chain land registration with Landver. Ensure secure, immutable, and transparent land records.",
    url: "https://www.demo.landver.net", 
    type: "website",
    images: [
      {
        url: "/images/landver-og-image.jpg", // Replace with our Open Graph image URL
        width: 1200,
        height: 630,
        alt: "Landver - Onchain Land Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@landver0", 
    title: "Landver Application",
    description:
      "Discover Landver, the ultimate blockchain solution for land registration and ownership verification.",
    images: ["/images/landver-og-image.jpg"], // Replace with our image URL
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
      </head>
      <body
        className={`${manrope.className} antialiased overflow-hidden text-black`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
