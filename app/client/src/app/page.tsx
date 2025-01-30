"use client";
import React from "react";
import { useConnect, Connector } from "@starknet-react/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header/Header";
import WalletSection from "@/components/WalletSection/WalletSection"; 
import Image from "next/image";


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
    <div className="min-h-screen bg-gray-50 flex flex-col py-8 lg:px-4 overflow-y-auto">
      <ToastContainer />
      <div className="flex-grow overflow-y-auto">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start">
          <Header />
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
        <WalletSection
          connectors={connectors}
          connect={connect}
          walletIcons={walletIcons}
          walletIdToName={walletIdToName}
        />
      </div>
    </div>
  );
};

export default Home;