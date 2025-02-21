"use client";
import React, { useEffect, useState } from "react";
import { useConnect, useAccount } from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";
import FadeLoader from "react-spinners/FadeLoader";

 
export function Providers({ children }: { children: React.ReactNode }) {

  const { connectors, connectAsync } = useConnect({  });
  const { address, status, connector } = useAccount();

  const [connecting, setConnecting] = useState(true)

  // const [currentModal, setCurrentModal] = useState<"intro"|"connect">("connect")

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
      localStorage.setItem("landver-connector", connector.id)
    } catch (error) {
      console.log(error);
      const localStorage = window.localStorage;
      localStorage.removeItem("landver-connector")
    }
  }

  useEffect(() => {
    (async()=>{
      if (status === "disconnected") {
        const localStorage = window.localStorage;
        if(localStorage.getItem("landver-connector")) {
          const selectedConnector = connectors.find(con => con.id === localStorage.getItem("landver-connector"))
          if(selectedConnector) await connect(selectedConnector)
        }
        setConnecting(false)
      } else if (status === "connected") {
        setConnecting(false)
      }
    })()
  }, [address, status])

  // set connector used in LS to try to reconnect if user refresh screen or logs again (it's a kind of remember me)
  useEffect(()=>{
    if(connector?.id){
      const localStorage = window.localStorage;
      localStorage.setItem("landver-connector", connector.id)
    }
  }, [connector])


  return (
    <div>
      {
        connecting && (
          <div className="h-72 flex justify-center items-center">
            <FadeLoader 
              color="#6E62E5"
              speedMultiplier={3}
              radius={30}
            />
          </div>
        )
      }
      { (!connecting&&!!address) && children }
      {/* { (!connecting&&!address) && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center" style={{ zIndex:1000 }}>
      
          {
            currentModal === "intro" && (
              <div className="bg-white rounded-lg px-7 py-6 max-w-[630px] w-full">
                <p className="text-center text-xl font-semibold mb-7">A Secure Platform for Land Registration, Inspection, and Validation on Starknet</p>
                <div className="w-[90%] mx-auto">
                  <p className="text-base font-medium mb-4">Effortless land registration with unique property IDs.</p>
                  <p className="text-base font-medium mb-4">Streamlined land inspection and verification for trusted records.</p>
                  <p className="text-base font-medium mb-4">Immutable, blockchain security for ownership and transactions</p>
                </div>
                <div className="w-[60%] mx-auto bg-[#6E62E5] rounded-md py-3 cursor-pointer" onClick={()=>setCurrentModal("connect")}>
                  <p className="text-white text-center">Connect wallet securely</p>
                </div>
              </div>

            )
          }
          {
            currentModal === "connect" && (
              <WalletConnectorModal />
            )
          }
  
        </div>
      ) } */}
    </div>
  );
}