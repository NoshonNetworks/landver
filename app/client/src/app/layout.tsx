import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./Providers";

import { Manrope } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landver Application",
  description: "Onchain Land Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased overflow-hidden text-black`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
