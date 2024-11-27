import React from "react";
import { X } from "lucide-react";
import { Button } from "../Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
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

        <p className="text-2xl text-center mb-2 font-bold">Something went wrong</p>
        <p className="text-lg text-center mb-4">Please refresh or try again.</p>
        <div className="flex justify-center items-center">
          <Button variant="error" onClick={onClose}>
            Accept
          </Button>
        </div>
        
        
      </div>
    </div>
  );
};

export {ErrorModal}
