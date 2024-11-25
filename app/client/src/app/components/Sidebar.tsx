"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
interface SidebarProps {
  role: "inspector" | "owner";
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();

  const menuItems = {
    inspector: [
      {
        name: "Dashboard",
        path: "/inspector/dashboard",
        icon: "dashboard.svg",
      },
      {
        name: "Verify Land",
        path: "/inspector/verify-land",
        icon: "layers.svg",
      },
      { name: "Verify User", path: "/inspector/verify-user", icon: "User.svg" },
      {
        name: "Transfer Ownership",
        path: "/inspector/transfer-ownership",
        icon: "layers.svg",
      },
      {
        name: "Reports and Logs",
        path: "/inspector/reports",
        icon: "layers.svg",
      },
      {
        name: "Notifications",
        path: "/inspector/notifications",
        icon: "bell.svg",
      },
    ],
    owner: [
      { name: "Dashboard", path: "/owner/dashboard", icon: "dashboard.svg" },
      { name: "Market Store", path: "/owner/market", icon: "layers.svg" },
      {
        name: "My Collections",
        path: "/owner/my-collections",
        icon: "layers.svg",
      },
      { name: "Favorites", path: "/owner/favorites", icon: "layers.svg" },
      {
        name: "Notifications",
        path: "/owner/notifications",
        icon: "bell.svg",
      },
      { name: "Wallet", path: "/owner/settings", icon: "User.svg" },
    ],
  };

  const userMenu = menuItems[role];

  return (
    <aside className="w-64 bg-white h-screen p-4">
      <div className="mb-6">
        <Image
          src="/images/logo.svg"
          alt="Landver logo"
          height={120}
          width={120}
        />
      </div>

      <nav className="flex flex-col gap-4">
        {userMenu.map((item) => (
          <div>
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 flex gap-2 rounded-md ${
                pathname === item.path
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Image
                src={`/icons/${item.icon}`}
                alt="icon"
                height={20}
                width={20}
              />
              {item.name}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
