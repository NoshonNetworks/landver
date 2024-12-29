"use client";
import React  from "react";
import { useConnect } from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";
import { useRouter } from "next/navigation";
// import FadeLoader from "react-spinners/FadeLoader";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Web Wallet"],
  ["argentMobile", "Argent mobile"],
]);

const walletIcons : {
  "braavos": string, 
  "argentX": string,
  "argentWebWallet": string,
  "argentMobile": string,
} = {
  "braavos": "/icons/wallets/braavos.svg",
  "argentX": "/icons/wallets/argent-x.svg",
  "argentWebWallet": "/icons/wallets/web.svg",
  "argentMobile": "/icons/wallets/argent-x.svg",
}


 
export function WalletConnectorModal({setShowWalletsModal}:{ setShowWalletsModal?:(value:boolean)=>void }) {

  const router = useRouter()
  const { connectors, connectAsync } = useConnect({  });

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
      localStorage.setItem("landver-connector", connector.id)
      if(setShowWalletsModal) setShowWalletsModal(false)
    } catch (error: unknown) {
      // Create user-friendly error message
      let errorMessage = "Failed to connect wallet. ";
      if (error instanceof Error) {
        if (error.message.includes("rejected")) {
          errorMessage = "Connection rejected. Please try again and approve the connection request.";
        } else if (error.message.includes("Connector not found")) {
          errorMessage = `${walletIdToName.get(connector.id) ?? connector.name} is not installed. Please install the wallet extension first.`;
        } else {
          errorMessage += "Please check if your wallet is properly configured and try again.";
        }
      }

    
      toast.error(errorMessage);
      console.error("Wallet connection error:", error);
    }
  }

  return (
    <div>
      <ToastContainer />
      {/* {
        connecting && (
          <div className="h-72 flex justify-center items-center">
            <FadeLoader 
              color="#6E62E5"
              speedMultiplier={3}
              radius={30}
            />
          </div>
        )
      } */}
        <div className="p-3 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center" style={{ zIndex:1000 }}>
              <div className="bg-white rounded-lg py-6 max-w-[630px] w-full relative">
                <div
                  className="absolute top-6 right-6 cursor-pointer"
                  onClick={()=>{
                    if(!!setShowWalletsModal){
                      setShowWalletsModal(false)
                    }
                    if(!setShowWalletsModal){
                      router.push("/dashboard")
                    }
                  }}  
                >
                  <IoMdClose size={22} />
                </div>
                <p className="text-center text-xl font-semibold mb-7">Connect Wallet</p>
                <div className="w-[93%] mx-auto flex flex-col gap-3">
                  {connectors.map((connector, index) => {
                    
                    return (
                      <div key={connector.id+"connectwalletmodal"+index} onClick={() => connect(connector)} className="bg-[#F2FCFA] px-4 flex justify-between items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all cursor-pointer">
                        <Image src={walletIcons[connector.id as "braavos"|"argentX"|"argentWebWallet"|"argentMobile"]} alt="ether" width={25} height={25} />
                        <div>
                          <p className="text-base text-center font-medium">{walletIdToName.get(connector.id) ?? connector.name}</p>
                          {/* <p className="text-base text-center ">Powered by Agent</p> */}
                        </div>
                        <Image src={"/icons/common/arror-up-right-with-underline.svg"} alt="ether" width={21} height={21} />
                      </div>
                    );
                  })}
                </div>
              </div>
        </div>
    </div>
  );
}