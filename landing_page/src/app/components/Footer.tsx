import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b flex flex-col gap-8 items-center from-gray-500 to-gray-950 text-white py-8">
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-around items-center space-x-4 w-[349px]">
        <Image
          src="/images/SN-Symbol-Flat colour-On dark bg.png"
          alt="StarkNet Logo"
          width={400}
          height={400}
          className="w-10 h-10 rounded-md"
        />
        <div className=" h-auto ">
          <h2 className="text-xl font-semibold text-gray-800">Onchain land</h2>
          <p className="text-sm text-gray-600">decentralized and secured. </p>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-8 px-4">
        <div className=" ">
          {" "}
          <div className="md:flex justify-center  gap-20">
            {/* Left Column: Resources */}
            <div className="flex flex-col ">
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <Link href="/about">Docs</Link>
                <li>
                  <a href="/" className="hover:underline">
                    API
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    Guides
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Community Links */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/community" className="hover:underline">
                    Community
                  </a>
                </li>
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
                    href="https://t.me/+e3pDyYQQerk3NjFk"
                    className="hover:underline"
                  >
                    Telegram
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
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 border-t border-gray-700 pt-6">
          <p>&copy; 2024 LandVer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
