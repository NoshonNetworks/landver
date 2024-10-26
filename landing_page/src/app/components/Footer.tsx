import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-500 to-gray-950 text-white py-8">
      <div className="container mx-auto flex flex-col gap-4 px-4">
        <div className=" md:flex grid grid-cols-1  gap-6  md:justify-around">
          <div className="flex justify-center md:hidden  items-center">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 w-[400px]">
              <Image
                src="/images/SN-Symbol-Flat colour-On dark bg.png"
                alt="StarkNet Logo"
                width={400}
                height={400}
                className="w-10 h-10 rounded-md"
              />
              <div className="text-left h-auto md:p-2 lg:p-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Powered by StarkNet
                </h2>
                <p className="text-sm text-gray-600">
                  Unparalleled security and scalability
                </p>
              </div>
            </div>
          </div>
          {/* Left Column: Resources */}
          <div className=" flex justify-between md:hidden ">
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <Link href="/about">Docs</Link>
                <li>
                  <a href="/" className="hover:underline">
                    API
                  </a>
                </li>
                <li>
                  <Link href="/Guides" className="hover:underline">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex md:hidden flex-col">
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/landver0" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:underline">
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/NoshonNetworks/landver/"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+e3pDyYQQerk3NjFk"
                  className="hover:underline"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
          </div>
          <div className="md:flex hidden flex-col ">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <Link href="/about">Docs</Link>
              <li>
                <a href="/" className="hover:underline">
                  API
                </a>
              </li>
              <li>
                <Link href="/Guides" className="hover:underline">
                  Guides
                </Link>
              </li>
            </ul>
          </div>
          <div className=" md:flex justify-center hidden  items-center">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 w-[400px]">
              <Image
                src="/images/SN-Symbol-Flat colour-On dark bg.png"
                alt="StarkNet Logo"
                width={400}
                height={400}
                className="w-10 h-10 rounded-md"
              />
              <div className="text-left h-auto md:p-2 lg:p-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Powered by StarkNet
                </h2>
                <p className="text-sm text-gray-600">
                  Unparalleled security and scalability
                </p>
              </div>
            </div>
          </div>
          {/* Right Column: Community Links */}
          <div className="md:flex hidden flex-col">
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/landver0" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:underline">
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/NoshonNetworks/landver/"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+e3pDyYQQerk3NjFk"
                  className="hover:underline"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2024 LandVer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
