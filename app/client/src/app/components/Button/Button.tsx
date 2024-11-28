import React from "react";

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
        return "bg-red-500 hover:bg-red-600 disabled:bg-red-300";
      case "success":
        return "bg-green-500 hover:bg-green-600 disabled:bg-green-300";
      case "grey":
        return `${
          outlined
            ? "border border-grey-5 text-grey bg-white"
            : "bg-grey-5 text-white"
        }`;
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
      className={`${getVariantStyles()} ${getSizeStyles()} ${classname} rounded-lg font-bold focus:outline-none  focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? `cursor-not-allowed ${
              outlined ? "disabled:border-grey-7 disabled:text-grey-6" : "disabled:bg-grey-6"
            }`
          : ""
      }`}>
      {children}
    </button>
  );
};

export default Button;
