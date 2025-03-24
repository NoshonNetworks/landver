"use client";
import React from "react";
import { useConnect } from "@starknet-react/core";
import { useAppContext } from "../../../app/context/appContext";

const WalletModal = () => {
  const { connectors } = useConnect();
  const { connectWallet } = useAppContext();

  return (
    <div className="p-6 max-w-md mx-auto  rounded-xl shadow-md space-y-4">
      <div className="space-y-2">
        {connectors.map((connector, index) => (
          <div
            key={`connectWalletModal${connector.id}${index}`}
            onClick={() => {
              connectWallet(connector);
            }}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 hover:border-gray-400 transition"
          >
            <p className="text-center font-medium">
              {connector.id.charAt(0).toUpperCase() + connector.id.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletModal;
