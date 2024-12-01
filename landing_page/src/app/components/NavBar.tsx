"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative">
      <div className="flex justify-between items-center p-4 md:p-8">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="logo" height={100} width={100} />
          <nav className="md:flex items-center gap-6 text-sm hidden">
            <Link href="/" className="hover:text-gray-600 transition-colors text-xs">
              Register Land
            </Link>
            <Link href="/" className="hover:text-gray-600 transition-colors text-xs">
              Inspect Land
            </Link>
            <Link href="/" className="hover:text-gray-600 transition-colors text-xs">
              Buy Land
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/signin"
              className="text-[#6364d5] hover:text-[#4e4fb8] transition-colors text-xs"
            >
              Login
            </Link>
            <Link className="text-white rounded text-xs py-3 px-6 bg-[#6364d5]" href='/signup'>Sign Up</Link>
          </div>
        </div>

        {/* Mobile Menu Button*/}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t md:hidden">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Register Land
            </Link>
            <Link
              href="/"
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inspect Land
            </Link>
            <Link
              href="/"
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Buy Land
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link
                href="/signin"
                className="p-2 text-[#6364d5] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <div className="px-2">
                <Link className="text-white rounded text-xs py-3 px-6 bg-[#6364d5]" href='/signup'>Sign Up</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
