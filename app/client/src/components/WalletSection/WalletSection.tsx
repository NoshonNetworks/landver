"use client";
import React from "react";
import WalletButton from "@/components/WalletButton/WalletButton"; // z
import type { Connector } from "@starknet-react/core";

interface WalletSectionProps {
  connectors: Connector[];
  connect: (connector: Connector) => void;
  walletIcons: { [key: string]: string };
  walletIdToName: Map<string, string>;
}

const WalletSection: React.FC<WalletSectionProps> = ({
  connectors,
  connect,
  walletIcons,
  walletIdToName,
}) => {
  return (
    <div className="w-full flex flex-col items-center text-center py-6">
      <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-[#6E62E5]">
        Connect Your Wallet
      </h3>
      <p className="text-sm lg:text-base mb-6 text-[#1F1F1F]">
        Connect a supported wallet to access Land Registry
      </p>
      <h5 className="text-base font-semibold mb-6 text-[#6B21A8]">
        Choose Wallet
      </h5>
      <div className="flex flex-col gap-4 items-center w-full px-4">
        {connectors.map((connector) => (
          <WalletButton
            key={connector.id}
            connector={connector}
            onClick={connect}
            walletIcons={walletIcons}
            walletIdToName={walletIdToName}
          />
        ))}
      </div>
    </div>
  );
};

export default WalletSection;