'use client'

import { useState } from "react";
import RegisterLandModal from "../RegisterLandModal";

export const Header = ({ title, hasCreateButton }:{ title:string, hasCreateButton?:boolean }={title:"", hasCreateButton:false}) => {

  const [showRegisterLandModal, setShowRegisterLandModal] = useState(false)

  return (
    <>
    <div className="flex items-center justify-between px-6 pb-4 pt-7">
        <p className="text-3xl font-semibold">{ title }</p>
        {
            hasCreateButton && (
                <div onClick={()=>setShowRegisterLandModal(true)} className="text-white cursor-pointer hover:scale-95 transition-all bg-gradient-to-r from-[#7369e0] via-[#6E62E5] to-[#6457ed] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 ">
                  Register New Land
                </div> 
            )
        }
      </div>
      <RegisterLandModal mode="create" isOpen={showRegisterLandModal} onClose={()=>setShowRegisterLandModal(false)} />
    </>
  );
}
