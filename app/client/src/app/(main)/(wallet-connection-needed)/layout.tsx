import { Providers } from "@/app/(main)/(wallet-connection-needed)/Providers"


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
