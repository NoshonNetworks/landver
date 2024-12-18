import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";

import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
});
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Landver | Onchain Land Management System",
  description: "Landver is an innovative onchain land management platform offering seamless land tracking, transactions, and property data verification. Powered by blockchain technology for transparency and efficiency.",
  icons: {
    icon: '/icons/LANDVER_LOGO_WHITE.svg',
    apple: '/icons/LANDVER_LOGO_WHITE.svg',
  },
  keywords: [
    "Landver",
    "onchain land management",
    "blockchain land management",
    "property management system",
    "real estate technology",
    "land tracking",
    "blockchain property verification",
    "digital land records",
  ],
  openGraph: {
    title: "Landver | Onchain Land Management System",
    description: "Manage your land and property seamlessly with Landver, a blockchain-powered platform for land tracking, transactions, and property data verification.",
    url: "https://www.landver.net", 
    siteName: "Landver",
    images: [
      {
        url: "/icons/LANDVER_LOGO_WHITE.svg",
        width: 1200,
        height: 630,
        alt: "Landver Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landver | Onchain Land Management System",
    description: "Landver provides innovative blockchain-powered solutions for efficient and transparent land management.",
    images: ["/images/logo.svg",'images/LANDVER_BLACK.jpg','/icons/LANDVER_LOGO_WHITE.svg'], 
  },
  authors: [
    { name: "Landver Team", url: "https://www.landver.net" },
  ],
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>{children}</body>
    </html>
  );
}
