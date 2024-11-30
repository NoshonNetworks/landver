"use client";
import React, { useEffect, useState } from "react";
import { useConnect, useAccount } from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";

export function Providers({ children }: { children: React.ReactNode }) {

  const { connectors, connectAsync } = useConnect({  });
  const { address, status, connector } = useAccount();

  const [, setConnecting] = useState(true)

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.log(error);
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
      { children }
    </div>
  );
}