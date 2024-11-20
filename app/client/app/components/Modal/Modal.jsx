"use client";
import React from "react";
import { X } from "lucide-react"; // Import the X icon from lucide-react

const Modal = ({
  isOpen,
  onClose,
  title = "Modal Title",
  children,
  closeText = "Close",
  className = "",
  contentClassName = "",
}) => {
 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div
        className={`p-8 border w-[40%] shadow-lg rounded-md bg-white ${className}`}
      >
        <div className="relative text-center">
       
          <X
            onClick={onClose}
            className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
            size={24} // You can adjust the size as needed
          />
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          <div className={`mt-2 px-7 py-3 ${contentClassName}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
