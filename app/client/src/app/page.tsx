"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import WalletConnector from "./components/Connector";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Image from 'next/image'
const Home = () => {
  const { status, address } = useAccount();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) {
      setError("Please select a user type.");
      return;
    }

    const redirectPath =
      userType === "inspector" ? "/inspector/dashboard" : "/owner/dashboard";

    router.push(redirectPath);
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Image src="/images/logo.svg" alt="landver logo" height={200} width={200}/>
      <h1 className="text-4xl font-bold mb-6">Land Registry</h1>

      {status === "connected" ? (
        <div className="text-center">
          <p className="text-xl font-medium text-gray-700 mb-4">
            Connected as:{" "}
            <span className="font-bold">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-80"
          >
            <h2 className="text-lg font-semibold mb-4">Select User Type</h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">User Type</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={userType || ""}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="owner">Land Owner</option>
                <option value="inspector">Land Inspector</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <Button
              type="submit"
              classname="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Proceed
            </Button>
          </form>
        </div>
      ) : (
        <>
          <Button
            onClick={toggleModal}
            classname="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Connect Wallet
          </Button>

          {isModalOpen && (
            <Modal onClose={toggleModal} isOpen={isModalOpen}>
              <div className="text-center p-6">
                <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                <WalletConnector />
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
