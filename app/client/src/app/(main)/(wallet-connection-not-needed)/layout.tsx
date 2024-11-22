import { Providers } from "@/app/(main)/(wallet-connection-not-needed)/Providers"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
          {children}
      </Providers>
    </>
  );
}
