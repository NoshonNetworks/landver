'use client'
import { useState } from "react";
// import Image from "next/image";
import type { Connector } from "@starknet-react/core";
import { useConnect, useDisconnect, useAccount, useContract, useSendTransaction } from "@starknet-react/core";

import { ABI as LandRegistryABI } from "@/abis/LandRegistryAbi";
import { LandList } from "./components/LandsList";

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Email"],
  ["argentMobile", "Argent mobile"],
]);

const contractAddress = "0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5";


export default function Home() {

  const { connectors, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, status, account,isConnected , connector } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
 console.log(connector)
  const [showModal, setShowModal] = useState(false)

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
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
    <div className="">

      <div className="flex justify-end items-center py-10 px-10">
        {
          status == "disconnected" && <button onClick={()=>{setShowModal(true)}} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
        }
 
        {
          status == "connected" && (
            <div onClick={()=>disconnect()} className="flex flex-col justify-center items-center cursor-pointer">
              <div className="text-base font-bold text-gray-700 bg-gray-200 p-2 rounded-md">{ address?.slice(0, 4) }...{ address?.slice(address.length-4) }</div>
            </div>
          )
        }
        

        {
          showModal && (
            <div onClick={()=>{setShowModal(false)}} className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center">
              <div className="bg-white p-10 rounded-lg">
                <div onClick={()=>{setShowModal(true)}} className="text-center mb-3 cursor-pointer font-bold">Close</div>
                <div className="text-2xl font-bold text-center">Connect with</div>
                <div className="h-10"></div>
              
                {connectors.map((connector) => {
                const isArgentMobile = connector.id === "argentMobile";
                return (
                  <div
                    key={connector.id}
                    onClick={() => connect(connector)}
                  >
                    <div className="text-lg text-center font-semibold cursor-pointer hover:scale-95 hover:text-gray-800 transition-all">
                      {walletIdToName.get(connector.id) ?? connector.name}
                    </div>
                  </div>
                );
              })}
              
              </div>
            </div>
          )
        }
      </div>


      {
        status === "connected" && <LandList/>
      }
      {
        status === "disconnected" && <>
          <div className="flex justify-center items-center h-56">
            <div className="text-center font-bold text-xl">
              Please login with your Starknet wallet
            </div>
          </div>
        </>
      }


    </div>
  );
}
