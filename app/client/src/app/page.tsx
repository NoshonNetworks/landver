"use client";
import React from "react";
import { useConnect } from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Web Wallet"],
  ["argentMobile", "Argent Mobile"],
]);

const walletIcons: { [key: string]: string } = {
  braavos: "/icons/wallets/braavos.svg",
  argentX: "/icons/wallets/argent-x.svg",
  argentWebWallet: "/icons/wallets/web.svg",
  argentMobile: "/icons/wallets/argent-x.svg",
};

const Home = () => {
  const { connectors, connectAsync } = useConnect();

  const connect = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
      localStorage.setItem("landver-connector", connector.id);
      toast.success("Wallet connected successfully!");
    } catch (error: unknown) {
      let errorMessage = "Failed to connect wallet.";
      if (error instanceof Error) {
        if (error.message.includes("rejected")) {
          errorMessage =
            "Connection rejected. Please try again and approve the connection request.";
        } else if (error.message.includes("Connector not found")) {
          errorMessage = `${
            walletIdToName.get(connector.id) ?? connector.name
          } is not installed. Please install the wallet extension first.`;
        } else {
          errorMessage +=
            "Please check if your wallet is properly configured and try again.";
        }
      }

      toast.error(errorMessage);
      console.error("Wallet connection error:", error);
    }
  };

  return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-8 px-4 overflow-y-auto">
          <ToastContainer />
          <div className="flex-grow overflow-y-auto">
            <Image
              src="/images/logo.svg"
              alt="landver logo"
              height={100}
              width={100}
              className="mb-6"
            />
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-start">
              <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-[#6E62E5]">
                  Land Registry Protocol
                </h1>
                <p className="text-lg mb-6 opacity-80 text-[#5E5B5B]">
                  Secure, transparent, and efficient land registration powered by
                  blockchain technology.
                </p>
                <p className="text-lg mb-6 text-[#6b21a8] font-semibold">
                  A Secure Platform for Land Registration, Inspection, and Validation
                  on Starknet
                </p>
                <div className="space-y-4">
      {[
        "Effortless land registration with unique property IDs.",
        "Streamlined land inspection and verification for trusted records.",
        "Immutable, blockchain security for ownership and transactions.",
      ].map((text, index) => (
        <div
          key={index}
          className="flex items-center gap-4 text-[#1F1F1F]"
        >
          <div className="flex items-center justify-center h-6 w-5 rounded-full bg-[#E9E7F9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#6E62E5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-base">{text}</p>
        </div>
      ))}
    </div>

              </div>
              <div className="w-full lg:w-1/2 p-6 flex justify-center">
                <Image
                  src="/images/WalletCard.png"
                  alt="landver logo"
                  height={400}
                  width={400}
                  className="mb-6 max-w-full"
                />
              </div>
            </div>
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
                  <div
                    key={connector.id}
                    onClick={() => connect(connector)}
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
                ))}
              </div>
            </div>
          </div>
        </div>
  );
};

export default Home;
