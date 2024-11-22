import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <
      >
          <div className="flex justify-center items-center h-screen w-screen">
            <Sidebar />
            <div className="flex-1 h-full bg-gray-100 overflow-y-scroll">
              <Navbar />
              {children}
            </div>
          </div>
      </>
  );
}
