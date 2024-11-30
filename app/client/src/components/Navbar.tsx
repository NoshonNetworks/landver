'use client'
import { useState } from "react";
import Image from "next/image";
import { useDisconnect, useAccount, useStarkProfile, useBalance } from "@starknet-react/core";


import { useBlockies } from "@/hooks/useBlockies";  
import { WalletConnectorModal } from "./WalletConnectModal";
import { useRouter } from "next/navigation";
import { Searchbar } from "./Search/Searchbar";

export const Navbar = () => {

  const router = useRouter()

  const [showUserOptions, setShowUserOptions] = useState(false)
  const [showWalletsModal, setShowWalletsModal] = useState(false)

  const { disconnect } = useDisconnect()

  const { address } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const { data: starkProfile } = useStarkProfile({ address });
  const { data } = useBalance({
    address: address,
  });

  const blockieImage = useBlockies({address})
  const profileImage = starkProfile?.profilePicture ?? blockieImage.blockiesImageSrc;

  return (
    <div className="bg-white py-5 px-5 flex items-center">
      <div className="w-4/6 hidden md:block">
        <Searchbar />
      </div>
      <div className="relative md:hidden flex-shrink-0">
        <div className="flex justify-center items-center w-[30px]">
          <Image width={22} height={22} alt="search" src={"/icons/common/search.svg"} className="" />
        </div>
      </div>

      {
        !address && (
          <div className="flex justify-end items-center relative w-full md:w-2/6 gap-2">
            <button onClick={()=>setShowWalletsModal(true)} className="text-white hover:scale-95 transition-all bg-gradient-to-r from-[#7369e0] via-[#6E62E5] to-[#6457ed] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 ">
              Connect Wallet
            </button>
          </div>
        )
      }

      {
        !!address && (
          <div className="flex justify-end items-center relative w-full md:w-2/6 gap-2">
            <div className="bg-gray-100 rounded-lg flex items-center gap-1 overflow-hidden pr-2.5">
              <div className=" p-1 m-1 md:p-1.5 md:m-1.5 bg-[#64748B] rounded-lg w-8 h-8 flex justify-center items-center flex-shrink-0">
                <Image src={"/icons/currencies/ether.svg"} width={30} height={30} alt="ether"/>
              </div>
              <p className="text-gray-500 font-medium text-xs sm:text-sm md:text-base flex-shrink-0">{ data?.formatted.slice(0,4) } { data?.symbol }</p>
            </div>
            <div className="bg-gray-100 p-1 md:p-2 rounded-lg flex-shrink-0">
              <div className="flex justify-center items-center flex-shrink-0">
                <Image src={"/icons/common/notifications.svg"} width={30} height={30} alt="ether"/>
              </div>
            </div>
            <div className="relative cursor-pointer hover:scale-95 transition-all">
              <div className="bg-gray-200 rounded-full overflow-hidden h-8 w-8 md:h-12 md:w-12 relative">
                {
                  profileImage && <Image onClick={()=>{setShowUserOptions(!showUserOptions)}} src={profileImage} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
                }
              </div>
              <div onClick={()=>{setShowUserOptions(!showUserOptions)}} className="absolute top-4 -right-1 w-4 h-4 md:top-6 md:-right-2 md:w-5 md:h-5">
                  <Image src={"/icons/common/dropdown-arrow-purple-bubble.svg"} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
              </div>
              
              {
                showUserOptions &&
                <div
                  onClick={()=>{
                    const localStorage = window.localStorage;
                    localStorage.removeItem("landver-connector")
                    localStorage.removeItem("user-type")
                    setShowUserOptions(!showUserOptions)
                    disconnect()
                    router.push("/")
                  }}
                  className="absolute top-[105%] right-0 shadow-sm shadow-gray-500 bg-white p-3 rounded-md"
                >
                  <p className="text-gray-500 font-semibold hover:scale-95">Disconnect</p>
                </div>
              }

            </div>
          </div>
        )
      }

      {
        showWalletsModal && <WalletConnectorModal setShowWalletsModal={setShowWalletsModal} />
      }

    </div>
  );
}
