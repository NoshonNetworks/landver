import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

import type { ModalProps } from "@/types/interfaces";

const DeleteLandModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    const [loading,] = useState(false)

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex:1000 }}
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="">
            <div className="w-16 h-16 rounded-full relative bg-[#F9F5FF] flex justify-center items-center">
                <div className="w-12 h-12 rounded-full mx-auto relative bg-[#F4EBFF] flex justify-center items-center">
                    <div className="w-9 h-9 rounded-full mx-auto relative">
                        <Image src={"/icons/sidebar/shared-selected.svg"} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
                    </div>
                </div>
            </div>
        </div>

        <p className="text-xl font-semibold">Delete Land Registry</p>
        <p className="text-base text-gray-600 mt-3">This registry is pending inspector approval. Are you sure you want to delete it? This action cannot be undone.</p>

        <div className="flex justify-between items-center gap-5 mt-7">
            <div onClick={() => !loading && onClose()} className="cursor-pointer flex-1 px-5 py-1 text-gray-400 border-gray-300 border rounded-lg"><p className="text-center">Cancel</p></div>
            <div className={`cursor-pointer flex-1 px-5 py-1 text-white border-transparent bg-[#E54545] border-2 rounded-lg`}><p className="text-center">Delete</p></div>
        </div>


      </div>

    

    </div>
  );
};

export default DeleteLandModal;
