import React from "react";

interface ButtonProps extends React.PropsWithChildren {
  classname?: string;
  variant?: "default" | "error" | "success" | "gray";
  size?: "small" | "medium" | "large" | "full";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

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
        return "bg-red-500 hover:bg-red-600 disabled:bg-red-300";
      case "success":
        return "bg-green-500 hover:bg-green-600 disabled:bg-green-300";
      case "gray":
        return "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300";
      default:
        return "bg-[#6364d5] hover:bg-[#5353c5] disabled:bg-[#a0a0d8]";
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
      className={`${getVariantStyles()} ${getSizeStyles()} ${classname} text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
