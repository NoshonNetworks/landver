"use client";
import { createPortal } from "react-dom";
import { useConnect, useAccount } from "@starknet-react/core";
import { useState } from "react";
import AddressBar from "./address-bar";
import Button from "./Button/Button";
const ConnectModal = ({ setIsOpen }) => {
  const { connect, connectors } = useConnect();
  return (
    <div
      className="absolute inset-0 bg-white bg-opacity-65 backdrop-blur-sm flex gap-x-4 justify-center pt-[400px] z-[100]"
      onClick={() => setIsOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex gap-x-4">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => {
              connect({ connector });
              setIsOpen(false);
            }}
            className="border border-black rounded-md text-black font-regular py-2 px-4  h-fit capitalize shadow-md"
          >
            Connect {connector.id}
          </button>
        ))}
      </div>
    </div>
  );
};

const Connector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();

  return (
    <div className="flex flex-col items-center space-y-4 relative">
      {isOpen &&
        createPortal(<ConnectModal setIsOpen={setIsOpen} />, document.body)}
      {!address ? (
        <button
          className="py-3 px-6 rounded-2xl bg-[#5B9EF7] text-white text-base leading-5 font-medium"
          onClick={() => {
           
            console.log(isOpen);
            setIsOpen((prev) => !prev);
          }}
        >
          Connect Wallet SecureLy
        </button>
      ) : (
        <AddressBar address={address} />
      )}
    </div>
  );
};

export default Connector;
