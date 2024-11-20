import React from "react";

const Input = ({ variant = "default", ...props }) => {
  const baseStyles = "border rounded px-4 py-2 outline-none focus:ring";
  const variantStyles = {
    default: "border-gray-300 focus:ring-blue-500",
    search: "border-gray-300 focus:ring-green-500 placeholder-gray-500",
  };

  const appliedStyles = `${baseStyles} ${
    variantStyles[variant] || variantStyles.default
  }`;

  return <input className={appliedStyles} {...props} />;
};

export default Input;
