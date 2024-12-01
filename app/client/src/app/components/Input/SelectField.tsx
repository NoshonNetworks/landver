import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Paragraph from "../P/P";

interface SelectProps<T>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: T[];
  nameKey: keyof T;
  label?: string;
  error?: string;
  classname?: string;
  onChange?: (value: string) => void;
  value?: string | undefined;
}

const SelectField = <T,>({
  options,
  nameKey,
  label,
  error,
  classname = "",
  onChange,
  value,
  ...props
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  useEffect(() => {
    setSelected(value);
  }, [value])

  return (
    <div className={`cursor-pointer relative w-full ${classname}`}>
      <ChevronDown
        color="#828282"
        size={20}
        className={`absolute right-2 ${label ? 'top-10' : 'top-2.5'} pointer-events-none cursor-pointer`}
      />
      {label && (
        <Paragraph classname="block text-sm font-medium text-black mb-1">
          {label}
          {props.required && <span className="text-red ml-0.5">*</span>}
        </Paragraph>
      )}
      <div
        onClick={toggleDropdown}
        className={`w-full px-3.5 py-2.5 min-h-11 border appearance-none rounded-md focus:outline-none text-grey-2 placeholder:text-grey focus:ring-1 focus:ring-primary focus:border-primary ${
          error ? "border-error" : "border-grey-4"
        }`}>
        {selected || ""}
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg border border-grey-4 z-10 max-h-[165px] overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-3.5 py-4 cursor-pointer text-grey-2 hover:bg-secondary hover:text-primary"
              onClick={() => handleOptionClick(String(option[nameKey]))}>
              {String(option[nameKey])}
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
