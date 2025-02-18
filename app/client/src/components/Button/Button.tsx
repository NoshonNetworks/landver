import React from "react";

<<<<<<< HEAD:app/client/src/app/components/Button/Button.tsx
interface ButtonProps extends React.PropsWithChildren {
  classname?: string;
  variant?: "default" | "error" | "success" | "grey" | "primary" | "secondary";
  size?: "small" | "medium" | "large" | "full";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  outlined?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}
=======
import type { ButtonProps } from "@/types/interfaces";
>>>>>>> pr/Birdmannn/257:app/client/src/components/Button/Button.tsx

const Button: React.FC<ButtonProps> = ({
  children,
  classname = "",
  variant = "default",
  size = "medium",
  type = "button",
  disabled = false,
  outlined = false,
  onClick,
  "aria-label": ariaLabel,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return `${
          outlined
            ? "border border-primary text-primary bg-white hover:primary-outlined-gradient-bg disabled:border-grey-7 disabled:text-grey-6"
            : "bg-primary hover:primary-gradient-bg text-white disabled:bg-grey-6"
        }`;
      case "error":
        return "bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white";
      case "success":
<<<<<<< HEAD:app/client/src/app/components/Button/Button.tsx
        return "bg-green-500 hover:bg-green-600 disabled:bg-green-300";
      case "grey":
        return `${
          outlined
            ? "border border-grey-5 text-grey bg-white"
            : "bg-grey-5 text-white"
        }`;
=======
        return "bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white";
      case "gray":
        return "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white";
      case "white":
        return "bg-white hover:bg-gray-100 disabled:bg-gray-300 text-[#6E62E5]";
      case "whiteWithBorder":
        return "bg-white border-[#6E62E5] border-2 hover:bg-[#F0EFFC] disabled:bg-gray-300 text-[#6E62E5]";
>>>>>>> pr/Birdmannn/257:app/client/src/components/Button/Button.tsx
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
        return "w-full py-2.5 text-base";
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
<<<<<<< HEAD:app/client/src/app/components/Button/Button.tsx
      className={`${getVariantStyles()} ${getSizeStyles()} ${classname} rounded-lg font-bold focus:outline-none  focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? `cursor-not-allowed ${
              outlined ? "disabled:border-grey-7 disabled:text-grey-6" : "disabled:bg-grey-6"
            }`
          : ""
      }`}>
=======
      // className="text-white cursor-pointer hover:scale-95 transition-all bg-gradient-to-r from-[#7369e0] via-[#6E62E5] to-[#6457ed] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 "
      className={` ${getVariantStyles()} ${getSizeStyles()} ${classname} rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
>>>>>>> pr/Birdmannn/257:app/client/src/components/Button/Button.tsx
      {children}
    </button>
  );
};

export {Button};
