import React from "react";

interface ButtonProps extends React.PropsWithChildren {
  classname?: string;
  variant?: "default" | "error" | "success" | "gray";
  size?: "small" | "medium" | "large" | "full";
}

const Button: React.FC<ButtonProps> = ({
  children,
  classname = "",
  variant,
  size = "medium", // Default size
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
        return "px-4 py-1";
      case "medium":
        return "px-6 py-2";
      case "large":
        return "px-8 py-3";
      case "full":
        return "px-12 py-[0.65rem]"; // Full-width button
      default:
        return "px-6 py-2";
    }
  };

  return (
    <button
      className={`${getVariantStyles()} ${getSizeStyles()} ${classname} text-white rounded text-xs py-3`}
    >
      {children}
    </button>
  );
};

export default Button;
