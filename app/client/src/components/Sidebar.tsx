'use client'
import { useState } from "react";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";
import { useLoginStore } from "@/store/loginStore";

import { GiHamburgerMenu } from "react-icons/gi";
import { useDisconnect } from "@starknet-react/core";


const OPTIONS = {
    owner: [
      { path:"/dashboard", name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
      { path:"/market-store", name:"Market Store", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/my-collections", name:"My Collections", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/favorites", name:"Favorites", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/notifications", name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
      { path:"/wallet", name:"Wallet", iconDisabled:"wallet.svg", iconEnabled:"wallet-selected.svg" },
    ],
    inspector: [
      { path:"/dashboard", name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
      { path:"/lands", name:"Lands", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/verify-user", name:"Verify User", iconDisabled:"user.svg", iconEnabled:"user-selected.svg" },
      { path:"/transfer-ownership", name:"Transfer Ownership", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/reports-and-logs", name:"Reports and Logs", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/notifications", name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
    ],
    client: [
        { path:"/dashboard", name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
        { path:"/market-store", name:"Market Store", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/my-collections", name:"My Collections", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/favorites", name:"Favorites", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/notifications", name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
        { path:"/wallet", name:"Wallet", iconDisabled:"wallet.svg", iconEnabled:"wallet-selected.svg" },
    ],
}



export const Sidebar = () => {
  const loginStore = useLoginStore()
  const { disconnect } = useDisconnect()

  const router = useRouter()
  const pathname = usePathname()

  const [hoveredItem, setHoveredItem] = useState<null|number>(null)

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      {/* DESKTOP SIDEBAR  */}
      <div className="bg-white min-w-[290px] w-1/5 h-full hidden lg:flex lg:flex-col lg:justify-between px-5 py-7" style={{ boxShadow:"1px 0px 2px rgba(0, 0, 0, 0.1)", zIndex:1000 }}>
        <div>
          <Image priority onClick={()=>router.push("/")} className="cursor-pointer" alt="Landver" src={"/logo-and-name.svg"} height={38} width={157} /> 
          <div className="flex flex-col pt-10 gap-6">
            {
              !!loginStore.userType && OPTIONS[loginStore.userType].map((item, index)=>{
                return (
                  <div key={"sidebar-desktop-id"+index} onClick={()=>router.push(item.path)} onMouseOver={()=>setHoveredItem(index)} onMouseLeave={()=>setHoveredItem(null)} className={`rounded-md flex items-center gap-2 cursor-pointer hover:scale-95 transition-all ${pathname.includes(item.path)?"bg-[#F0EFFC]":""} py-4 px-2`}>
                    {
                        (pathname.includes(item.path) || hoveredItem===index)
                        ? <Image alt="Landver" src={`/icons/sidebar/${item.iconEnabled}`} height={26} width={26} /> 
                        : <Image alt="Landver" src={`/icons/sidebar/${item.iconDisabled}`} height={26} width={26} />
                    }
                    <p className={` ${pathname.includes(item.path)?"text-[#6E62E5]":"text-[#7E8299]"} hover:text-[#6E62E5] transition-all text-base`}>{ item.name }</p> {/*#F0EFFC for purple bg*/}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div 
          className="flex items-center gap-1 cursor-pointer" 
          onClick={()=>{
            const localStorage = window.localStorage;
            localStorage.removeItem("landver-connector")
            localStorage.removeItem("user-type")
            disconnect()
            router.push("/")
          }}
          >
          <Image  className="cursor-pointer" alt="Landver" src={"/icons/sidebar/logout.svg"} height={30} width={30} /> 
          <p className={`text-[#7E8299] hover:text-[#6E62E5] transition-all text-base`}>logout</p>
        </div>
      </div>

      
      {/* MOBILE SIDEBAR  */}
      <div style={{ zIndex:100000, transform:showSidebar?"scalex(1)":"scalex(0)", transformOrigin:"left" }} className=" overflow-hidden lg:hidden fixed bottom-4 left-0 top-4 rounded-xl shadow-md shadow-gray-400 w-[90%] sm:w-[400px] bg-white flex flex-col transition-all">
        <div className="bg-[#F3F4F6] py-4 flex justify-center">
          <Image priority onClick={()=>{
            setShowSidebar(false)
            router.push("/")
          }} className="cursor-pointer" alt="Landver" src={"/logo-and-name.svg"} height={38} width={157} /> 
        </div>
        {
            !!loginStore.userType && OPTIONS[loginStore.userType].map((item, index)=>{
              return (
                <div key={"sidebar-desktop-id"+index} onClick={()=>{
                  setShowSidebar(false)
                  router.push(item.path)
                }} onMouseOver={()=>setHoveredItem(index)} onMouseLeave={()=>setHoveredItem(null)} className={`rounded-md flex items-center gap-2 cursor-pointer hover:scale-95 transition-all ${pathname.includes(item.path)?"bg-[#F0EFFC]":""} py-4 px-2`}>
                  {
                      (pathname.includes(item.path) || hoveredItem===index)
                      ? <Image alt="Landver" src={`/icons/sidebar/${item.iconEnabled}`} height={26} width={26} /> 
                      : <Image alt="Landver" src={`/icons/sidebar/${item.iconDisabled}`} height={26} width={26} />
                  }
                  <p className={` ${pathname.includes(item.path)?"text-[#6E62E5]":"text-[#7E8299]"} hover:text-[#6E62E5] transition-all text-base`}>{ item.name }</p> {/*#F0EFFC for purple bg*/}
                </div>
              )
            })
          }
      </div>

      <div onClick={()=>setShowSidebar(!showSidebar)} style={{ zIndex:100000 }} className="lg:hidden fixed bottom-16 right-4 sm:right-10 rounded-full bg-[#6E62E5] hover:bg-[#5d50e3] w-10 h-10 flex justify-center items-center cursor-pointer hover:scale-95 transition-all">
        <GiHamburgerMenu color="#fff" size={20} />
      </div>
    </>
  );
}
