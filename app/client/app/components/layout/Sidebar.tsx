"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "../../../app/context/appContext";

const Sidebar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const { disconnectWallet } = useAppContext();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const userType = pathSegments[2];

  const sidebarElements = {
    owner: [
      {
        name: "Dashboard",
        path: `/dashboard/${userType}`,
        iconPath: "/icons/dashboard.svg",
      },
      {
        name: "Market Store",
        path: "/marketstore",
        iconPath: "/icons/layers.svg",
      },
      {
        name: "My Collections",
        path: "/collections",
        iconPath: "/icons/layers.svg",
      },
      { name: "Favorites", path: "/favorites", iconPath: "/icons/layers.svg" },
      {
        name: "Notifications",
        path: "/notifications",
        iconPath: "/icons/bell.svg",
      },
      { name: "Wallet", path: "/wallet", iconPath: "/icons/User.svg" },
    ],
    inspector: [
      {
        name: "Dashboard",
        path: `/dashboard/${userType}`,
        iconPath: "/icons/dashboard.svg",
      },
      {
        name: "Verify Land",
        path: "/verifyland",
        iconPath: "/icons/layers.svg",
      },
      { name: "Verify User", path: "/verifyuser", iconPath: "/icons/User.svg" },
      {
        name: "Transfer Ownership",
        path: "/transferownership",
        iconPath: "/icons/layers.svg",
      },
      {
        name: "Reports and Logs",
        path: "/reports",
        iconPath: "/icons/layers.svg",
      },
      {
        name: "Notifications",
        path: "/notifications",
        iconPath: "/icons/bell.svg",
      },
    ],
  };

  const menuItems =
    sidebarElements[userType as keyof typeof sidebarElements] || [];

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Close Button */}
      <button className="md:hidden p-2 self-end" onClick={closeSidebar}>
        <X size={24} />
      </button>

      {/* Logo */}
      <div className="p-4 mb-3">
        <Image
          src="/logo-and-name.svg"
          alt="landver logo"
          height={120}
          width={120}
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 flex-grow p-3">
        {menuItems.map((item, index) => {
          const fullPath = item.path.startsWith("/dashboard")
            ? item.path
            : `/dashboard/${userType}${item.path}`;
          const isActive = pathname === fullPath;

          return (
            <Link
              key={index}
              href={fullPath}
              className={`p-3 rounded-md flex items-center space-x-2 transition-colors ${
                isActive ? "bg-secondary text-primary" : "hover:bg-gray-100"
              }`}
            >
              <Image
                src={item.iconPath}
                alt={item.name}
                width={20}
                height={20}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col space-y-2 p-3">
        <Link
          href={`/dashboard/${userType}/settings`}
          className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${
            pathname === `/dashboard/${userType}/settings`
              ? "bg-primary text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button
          onClick={disconnectWallet}
          className="p-2 rounded-md flex items-center space-x-2 hover:bg-red-100 transition-colors"
        >
          <Image
            src="/icons/sidebar/logout.svg"
            alt="Logout"
            width={20}
            height={20}
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
