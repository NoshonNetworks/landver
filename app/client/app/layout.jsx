import "./globals.css";
import { Providers } from "./components/providers";
import { Manrope } from "next/font/google";
const manrope = Manrope({
  subsets: ["latin"],
});
export const metadata = {
  title: "Landver Application",
  description: "Onchain Land Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} relative antialised`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
