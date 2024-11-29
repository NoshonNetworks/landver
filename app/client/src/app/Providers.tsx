"use client";
import React, { useEffect } from "react";


import { useLoginStore } from "@/store/loginStore";
 
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  voyager
} from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";

import { InjectedConnector } from "starknetkit/injected"
import { ArgentMobileConnector, isInArgentMobileAppBrowser } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet"
import { useRouter } from "next/navigation";
 
export function Providers({ children }: { children: React.ReactNode }) {
  const loginStore = useLoginStore()
  const router = useRouter()

  const connectors = isInArgentMobileAppBrowser() ? [
    ArgentMobileConnector.init({
      options: {
        url:"",
        dappName: "Example dapp",
        projectId: "example-project-id",
      },
      inAppBrowserOptions: {},
    })
  ] as Connector[] : [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" }}),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" }}),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    ArgentMobileConnector.init({
      options: {
        url:"",
        dappName: "Example dapp",
        projectId: "example-project-id",
      }
    })
  ] as Connector[]


  

  useEffect(()=>{
    const localStorage = window.localStorage
    const userType = localStorage.getItem("user-type")

    if(!userType) {
      loginStore.clearUserType()
      localStorage.removeItem("user-type")
      router.push("/")
      return 
    }
    const allowedUserTypes = ["owner", "inspector"]
    if (!allowedUserTypes.includes(userType)) { 
      loginStore.clearUserType()
      localStorage.removeItem("user-type")
      router.push("/")
      return 
    }

    loginStore.setUserType(userType as "owner"|"inspector")
  }, [])


 
  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {/* { !loginStore.userType && (
        <div className="h-72 flex justify-center items-center">
          <FadeLoader 
            color="#6E62E5"
            speedMultiplier={2}
            radius={30}
          />
        </div>
      ) } */}
      {/* { loginStore.userType && children } */}
      { children }
    </StarknetConfig>
  );
}