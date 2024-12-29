import React from "react";

interface ButtonProps extends React.PropsWithChildren {
  classname?: string;
  variant?: "default" | "error" | "success" | "gray";
  size?: "small" | "medium" | "large" | "full";
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  classname = "",
  variant,
  size = "medium", // Default size
  onClick,
  disabled,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return "bg-red-500 hover:bg-red-600";
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "gray":
        return "bg-[#828282]";
      default:
        return "bg-[#6364d5]"; 
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
        return "px-12 py-[0.65rem] text-base"; 
      default:
        return "px-6 py-2 text-base";
    }
  };
  
  return (
    <button
      className={`${getVariantStyles()} ${getSizeStyles()} ${classname} text-white font-bold rounded-md text-center ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;