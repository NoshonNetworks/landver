"use client";
import React, { useState } from "react";
import type { Connector as StarknetConnector } from "@starknet-react/core";
import { useConnect, useDisconnect, useAccount } from "@starknet-react/core";
import { X } from "lucide-react";
import Modal from "./Modal/Modal";

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Email"],
  ["argentMobile", "Argent mobile"],
]);

interface WalletConnectorProps {
  onLoginSuccess?: () => void;
}

export default function WalletConnector({
  onLoginSuccess,
}: WalletConnectorProps) {
  const { connectors, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, status } = useAccount();
  const [showModal, setShowModal] = useState(false);

  async function connect(connector: StarknetConnector) {
    try {
      await connectAsync({ connector });
      setShowModal(false);
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  async function disconnect() {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {status === "disconnected" && (
        <button
          onClick={() => setShowModal(true)}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Connect Wallet Securely
        </button>
      )}

      {status === "connected" && (
        <div
          onClick={() => disconnect()}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <div className="text-base font-bold text-gray-700 bg-gray-200 p-2 rounded-md">
            {address?.slice(0, 4)}...{address?.slice(address.length - 4)}
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="relative bg-white p-10 rounded-lg">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setShowModal(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">Connect with</h2>

          {connectors.map((connector) => (
            <div key={connector.id} onClick={() => connect(connector)}>
              <div className="text-lg text-center font-semibold cursor-pointer hover:scale-95 hover:text-gray-800 transition-all mb-3">
                {walletIdToName.get(connector.id) ?? connector.name}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
