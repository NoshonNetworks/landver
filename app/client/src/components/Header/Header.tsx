"use client";
import React from "react";
import Image from "next/image";
import FeatureList from "@/components/FeatureList/FeatureList";

const Header: React.FC = () => {
  return (
    <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col items-center lg:items-start lg:text-left">
      <Image
        src="/images/logo.svg"
        alt="landver logo"
        height={100}
        width={100}
        className="mb-6"
      />
      <h1 className="text-3xl lg:text-4xl lg:w-2/3 font-bold mb-4 text-[#6E62E5]">
        Land Registry Protocol
      </h1>
      <p className="text-lg mb-6 opacity-80 text-[#5E5B5B] text-center">
        Secure, transparent, and efficient land registration powered by blockchain
        technology.
      </p>
      <p className="text-lg mb-6 text-[#6b21a8] font-semibold">
        A Secure Platform for Land Registration, Inspection, and Validation on
        Starknet
      </p>
      <FeatureList />
    </div>
  );
};

export default Header;