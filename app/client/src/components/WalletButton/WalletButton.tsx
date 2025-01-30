"use client";
import React from "react";
import Image from "next/image";
import type { Connector } from "@starknet-react/core";

interface WalletButtonProps {
  connector: Connector;
  onClick: (connector: Connector) => void;
  walletIcons: { [key: string]: string };
  walletIdToName: Map<string, string>;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  connector,
  onClick,
  walletIcons,
  walletIdToName,
}) => {
  return (
    <div
      key={connector.id}
      onClick={() => onClick(connector)}
      className="flex flex-row justify-center items-center gap-4 rounded-lg border-2 py-2 px-10 md:px-20 lg:px-40 border-[#d3d3f3] text-[#6364D5] cursor-pointer hover:scale-95 transition-transform w-full max-w-lg"
    >
      <Image
        src={walletIcons[connector.id]}
        alt={`${connector.name} logo`}
        height={20}
        width={20}
      />
      <span>{walletIdToName.get(connector.id) ?? connector.name}</span>
    </div>
  );
};

export default WalletButton;