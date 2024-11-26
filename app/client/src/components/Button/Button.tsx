import React from "react";

import type { ButtonProps } from "@/types/interfaces";

const Button: React.FC<ButtonProps> = ({
  children,
  classname = "",
  variant = "default",
  size = "medium",
  type = "button",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return "bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white";
      case "success":
        return "bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white";
      case "gray":
        return "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white";
      case "white":
        return "bg-white hover:bg-gray-100 disabled:bg-gray-300 text-[#6E62E5]";
      case "whiteWithBorder":
        return "bg-white border-[#6E62E5] border-2 hover:bg-[#F0EFFC] disabled:bg-gray-300 text-[#6E62E5]";
      default:
        return "bg-[#6364d5] hover:bg-[#5353c5] disabled:bg-[#a0a0d8] text-white";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-4 py-1 text-sm";
      case "medium":
        return "px-6 py-2 text-base";
      case "large":
        return "px-8 py-3 text-lg";
      case "full":
        return "w-full py-2 text-base";
      default:
        return "px-6 py-2 text-base";
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      // className="text-white cursor-pointer hover:scale-95 transition-all bg-gradient-to-r from-[#7369e0] via-[#6E62E5] to-[#6457ed] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 "
      className={` ${getVariantStyles()} ${getSizeStyles()} ${classname} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export {Button};
