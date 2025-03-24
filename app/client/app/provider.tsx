"use client";
import React, { useEffect, useCallback } from "react";
import { useConnect, useAccount } from "@starknet-react/core";

export function Providers({ children }: { children: React.ReactNode }) {
  const { connectors, connectAsync } = useConnect();
  const { status } = useAccount();

  // Memoized function to avoid re-creating on every render
  const connectWallet = useCallback(async () => {
    const LS_connector = localStorage.getItem("connector");

    if (LS_connector) {
      const connector = connectors.find((con) => con.id === LS_connector);

      if (connector) {
        try {
          await connectAsync({ connector });
          console.log("Connected successfully!");
        } catch (error) {
          console.error("Connection error:", error);
        }
      }
    }

    if (status === "disconnected" && LS_connector) {
      try {
        await connectAsync({
          connector: connectors.find((con) => con.id === LS_connector),
        });
        console.log("Reconnected successfully!");
      } catch (error) {
        console.error("Reconnection error:", error);
      }
    }
  }, [connectAsync, connectors, status]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return <>{children}</>;
}
