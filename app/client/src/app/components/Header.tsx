"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-md px-4 py-2 w-64 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <span className="text-gray-600 font-medium">15.64 ETH</span>
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
          S
        </div>
      </div>
    </header>
  );
};

export default Header;
