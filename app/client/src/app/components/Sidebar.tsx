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
      { name: "Dashboard", path: "/inspector/dashboard" },
      { name: "Verify Land", path: "/inspector/verify-land" },
      { name: "Verify User", path: "/inspector/verify-user" },
      { name: "Transfer Ownership", path: "/inspector/transfer-ownership" },
      { name: "Reports and Logs", path: "/inspector/reports" },
      { name: "Notifications", path: "/inspector/notifications" },
      { name: "Settings", path: "/inspector/settings" },
    ],
    owner: [
      { name: "Dashboard", path: "/owner/dashboard" },
      { name: "My Lands", path: "/owner/my-lands" },
      { name: "Transfer Requests", path: "/owner/transfer-requests" },
      { name: "Purchase History", path: "/owner/purchase-history" },
      { name: "Notifications", path: "/owner/notifications" },
      { name: "Settings", path: "/owner/settings" },
    ],
  };

  const userMenu = menuItems[role];

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <div className="mb-6">
        <Image
          src="/images/logo.svg"
          alt="Landver logo"
          height={80}
          width={80}
        />
      </div>

      <nav className="flex flex-col gap-4">
        {userMenu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-2 rounded-md ${
              pathname === item.path
                ? "bg-purple-100 text-purple-600"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
