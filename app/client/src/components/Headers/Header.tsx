'use client'

import { useState } from "react";
import RegisterLandModal from "../RegisterLandModal";
import { Button } from "../Button/Button";

export const Header = ({ title, hasCreateButton, hasTransferButton }:{ title:string, hasCreateButton?:boolean, hasTransferButton?:boolean }={title:"", hasCreateButton:false, hasTransferButton:false}) => {

  const [showRegisterLandModal, setShowRegisterLandModal] = useState(false)

  return (
    <>
    <div className="flex items-center justify-between px-6 pb-4 pt-7">
        <p className="text-3xl font-semibold">{ title }</p>
        {
            hasCreateButton && (
                <Button onClick={()=>setShowRegisterLandModal(true)}>
                  Register New Land
                </Button>
            )
        }
        {
            hasTransferButton && (
                <Button>
                  Transfer
                </Button>
            )
        }
      </div>
      <RegisterLandModal mode="create" isOpen={showRegisterLandModal} onClose={()=>setShowRegisterLandModal(false)} />
    </>
  );
}
