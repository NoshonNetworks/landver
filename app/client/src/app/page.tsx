"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";

// Define types for the wallet object
interface Wallet {
  id: string;
  name: string;
  icon: string | null;
}

// Define props for FeatureItem component
interface FeatureItemProps {
  text: string;
}

// Define props for WalletButton component
interface WalletButtonProps {
  wallet: Wallet;
  onClick: (walletId: string) => void;
  isLoading: boolean;
  isConnected: boolean;
}

// Mock function to fetch supported wallets (replace with actual API call)
const fetchSupportedWallets = async (): Promise<Wallet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "braavos", name: "Braavos", icon: "/images/Braavos.png" },
        { id: "argent-x", name: "Argent X", icon: "/images/Argent.png" },
        { id: "web-wallet", name: "Web Wallet", icon: null },
        { id: "argent-mobile", name: "Argent Mobile", icon: "/images/Argent.png" },
      ]);
    }, 1000);
  });
};

// FeatureItem component
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-center justify-start gap-2">
    <div className="size-[30px] bg-[#E9E7F9] rounded-full flex items-center justify-center">
      <FaCheck className="text-[#6E62E5] text-[15px]" />
    </div>
    <p className="font-medium text-[16px] text-black">{text}</p>
  </li>
);

// WalletButton component
const WalletButton: React.FC<WalletButtonProps> = ({ wallet, onClick, isLoading, isConnected }) => (
  <button
    className={`flex items-center justify-center gap-2 w-full py-2 font-semibold 
      ${isConnected ? "bg-green-500 text-white" : "bg-white text-[#6364D5]"} 
      border-[1px] border-gray-300 rounded-lg transition-transform duration-300 
      ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg hover:bg-[#E0D3F5]"}`}
    onClick={() => onClick(wallet.id)}
    disabled={isLoading}
  >
    {wallet.icon && <Image src={wallet.icon} alt={`${wallet.name} Icon`} width={24} height={24} />}
    <p>{isLoading ? "Connecting..." : isConnected ? "Connected" : wallet.name}</p>
  </button>
);

// Main component
const Next: React.FC = () => {
  const [supportedWallets, setSupportedWallets] = useState<Wallet[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const wallets = await fetchSupportedWallets();
        setSupportedWallets(wallets);
      } catch (err) {
        setError("Failed to load wallets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadWallets();
  }, []);

  // Function to handle wallet connection
  const handleWalletConnect = async (walletId: string) => {
    setConnectingWallet(walletId);

    try {
      // Simulate an API call for connecting to a wallet
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConnectedWallet(walletId);
      alert(`Connected to ${walletId}`);
    } catch (err) {
      setError("Failed to connect. Try again.");
    } finally {
      setConnectingWallet(null);
    }
  };

  return (
    <div className="flex flex-col md:items-start justify-center px-5 w-full min-h-screen overflow-auto">
      {/* Header */}
      <header>
        <Image src="/images/logo.png" alt="Land Registry Protocol Logo" width={100} height={100} priority />
      </header>

      {/* Main Section */}
      <main className="flex flex-col md:flex-row md:justify-between justify-center mt-10 w-full">
        <section className="text-center md:text-start">
          <h1 className="md:text-[48px] text-[30px] font-bold text-[#6E62E5]">
            Land Registry <br />Protocol
          </h1>
          <p className="text-gray-400 mt-2 text-[16px]">
            Secure, transparent, and efficient land registration <br /> powered by blockchain technology.
          </p>
          <h2 className="text-[#6B21A8] text-[20px] font-semibold mt-5">
            A Secure Platform for Land Registration, Inspection, and <br />Validation on Starknet
          </h2>
          <ul className="text-gray-600 mt-8 space-y-4">
            <FeatureItem text="Effortless land registration with unique property IDs." />
            <FeatureItem text="Streamlined land inspection and verification for trusted records." />
            <FeatureItem text="Immutable, blockchain security for ownership and transactions." />
          </ul>
        </section>
        <section className="flex justify-center md:mr-32">
          <Image src="/images/wallet-illustration.png" alt="Wallet Illustration" width={450} height={450} priority />
        </section>
      </main>

      {/* Wallet Connection Section */}
      <section className="flex items-center justify-center w-full mt-16 text-center mb-10">
        <div className="md:w-[465px]">
          <h2 className="md:text-[45px] font-bold text-[#6E62E5]">Connect Your Wallet</h2>
          <p className="mt-4 text-[#1F1F1F] text-[16px] font-medium">
            Connect a supported wallet to access Land Registry
          </p>
          <p className="my-8 text-[#6B21A8] font-semibold">Choose a wallet</p>
          
          {/* Loading / Error States */}
          {loading && <p className="text-gray-500">Loading wallets...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Wallet Buttons */}
          <div className="mt-4 space-y-3">
            {supportedWallets.map((wallet) => (
              <WalletButton
                key={wallet.id}
                wallet={wallet}
                onClick={handleWalletConnect}
                isLoading={connectingWallet === wallet.id}
                isConnected={connectedWallet === wallet.id}
              />
            ))}
          </div>

          {/* Connected Message */}
          {connectedWallet && (
            <p className="mt-6 text-green-600 font-semibold">
              ✅ Connected to {connectedWallet}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Next;
