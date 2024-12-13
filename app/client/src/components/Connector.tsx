"use client";
import React, { useState } from "react";
import { useDisconnect, useAccount } from "@starknet-react/core";
import {Button} from "@/components/Button/Button";
import { WalletConnectorModal } from "@/components/WalletConnectModal"


import type { WalletConnectorProps } from "@/types/interfaces";
import { Check } from "lucide-react";


export default function WalletConnector({
}: WalletConnectorProps) {
  const { disconnectAsync } = useDisconnect();
  const { address, status } = useAccount();
  const [showModal, setShowModal] = useState(false);

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
        <div className="  bg-gray-100" >
  <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center ">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">
      A Secure Platform for Land Registration, Inspection, and Validation on Starknet
    </h2>
    <ul className="text-left space-y-4 mb-6">
      <li className="flex items-start">
        <Check className="text-purple-600 mt-1 mr-2" />
        <span className="text-gray-700">
          Effortless land registration with unique property IDs.
        </span>
      </li>
      <li className="flex items-start">
        <Check className="text-purple-600 mt-1 mr-2" />
        <span className="text-gray-700">
          Streamlined land inspection and verification for trusted records.
        </span>
      </li>
      <li className="flex items-start">
        <Check className="text-purple-600 mt-1 mr-2" />
        <span className="text-gray-700">
          Immutable, blockchain security for ownership and transactions.
        </span>
      </li>
    </ul>
    <Button
      onClick={() => setShowModal(true)}
      classname="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
    >
      Connect Wallet Securely
    </Button>
  </div>
</div>

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

      {
        showModal && (
          <WalletConnectorModal setShowWalletsModal={setShowModal} />
        )
      }
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
      </Modal> */}
    </div>
  );
}
