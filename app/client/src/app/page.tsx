"use client";
import React, { useState } from "react";
import { useAccount } from "@starknet-react/core";
import WalletConnector from "./components/Connector";
import { LandList } from "./components/LandsList";
import Modal from "./components/Modal/Modal";

export default function Home() {
  const { status } = useAccount();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Wallet Connector */}
      <div className="flex justify-end items-center py-10 px-10">
        <WalletConnector />
      </div>

      {/* Main Content */}
      {status === "connected" ? (
        <LandList />
      ) : (
        <>
          <div className="flex justify-center items-center h-56">
            <button
              onClick={toggleModal}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Login with Wallet
            </button>
          </div>

          {isModalOpen && (
            <Modal onClose={toggleModal} isOpen={isModalOpen}>
              <div className="text-center p-6">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <p className="text-gray-700 mb-6">
                  To proceed, please connect your Starknet wallet.
                </p>
                <WalletConnector />
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
