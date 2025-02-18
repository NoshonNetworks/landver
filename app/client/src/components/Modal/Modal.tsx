import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, size, children }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "w-full max-w-[400px]";
      case "md":
        return "w-full max-w-[560px]";
      case "lg":
        return "w-full max-w-[630px]";
      default:
        return "w-full max-w-[560px]";
    }
  };

  return (
    <div
<<<<<<< HEAD:app/client/src/app/components/Modal/Modal.tsx
      className="fixed backdrop-blur-[8px] top-0 left-0 right-0 bottom-0 bg-blue-2/70 bg-opacity-60 flex justify-center items-center z-30"
      onClick={handleBackgroundClick}>
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 ${getSizeStyles()}`}>
=======
      className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center items-center z-50 border"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full  max-w-md p-6 border">
>>>>>>> pr/Birdmannn/257:app/client/src/components/Modal/Modal.tsx
        {/* Close Button */}
        <X
          color="#828282"
          size={24}
          className="absolute right-6 top-6 cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
