import React from "react";

import {
  User,
  LockIcon,
  Eye,
  CheckCircle2Icon,
  Globe2Icon,
  ListCheckIcon,
  AwardIcon,
} from "lucide-react";

const WhyChooseLandVer: React.FC = () => {
  return (
    <div className="p-8 bg-white dark:from-gray-800 dark:to-black dark:bg-[#060304] ">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <LockIcon size={40} className="mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Decentralized & Secure
          </h3>
          <p className="text-gray-600 dark:text-white">
            LandVer utilizes blockchain technology to ensure that your land
            records are tamper-proof and secure, offering peace of mind.
          </p>
        </div>

        <div className="p-6">
          <Eye size={40} className="mx-auto text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Transparent Transactions
          </h3>
          <p className="text-gray-600 dark:text-white">
            All transactions are recorded on the blockchain, providing
            transparency and eliminating the need for intermediaries.
          </p>
        </div>

        <div className="p-6">
          <Globe2Icon size={40} className="mx-auto text-yellow-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Global Accessibility
          </h3>
          <p className="text-gray-600 dark:text-white">
            Access your land records from anywhere in the world with LandVer
            &apos;s intuitive and user-friendly platform.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center p-3 mb-3 text-gray-900 dark:text-white">
        How It Works
      </h2>
      <div className="grid md:grid-cols-4 gap-8 text-center">
        <div className="p-6">
          <User size={40} className="mx-auto text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Register
          </h3>
          <p className="text-gray-600 dark:text-white">
            Sign up and submit your land details.
          </p>
        </div>

        <div className="p-6">
          <CheckCircle2Icon size={40} className="mx-auto text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Verification
          </h3>
          <p className="text-gray-600 dark:text-white">
            Our system verifies and secures your land data on the blockchain.
          </p>
        </div>

        <div className="p-6">
          <AwardIcon size={40} className="mx-auto text-orange-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            NFT Minting
          </h3>
          <p className="text-gray-600 dark:text-white">
            LandVer mints NFTs for landowners, providing indisputable proof of
            ownership.
          </p>
        </div>

        <div className="p-6">
          <ListCheckIcon size={40} className="mx-auto text-teal-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Management
          </h3>
          <p className="text-gray-600 dark:text-white">
            Manage, transfer, or sell your land with ease and security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseLandVer;
