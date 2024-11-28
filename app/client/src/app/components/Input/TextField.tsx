import React from "react";
import Paragraph from "../P/P";

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  classname?: string;
  onChange?: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  classname = "",
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={`w-full ${classname}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-black mb-1">
          {label}
          {props.required && <span className="text-red ml-0.5">*</span>}
        </label>
      )}
      <input
        id={props.id}
        className={`w-full px-3.5 py-2.5 border rounded-lg text-grey-2 placeholder:text-grey focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
          error ? "border-error" : "border-grey-4"
        }`}
        onChange={handleChange}
        {...props}
      />
      {error && <Paragraph size="xs" classname="mt-1 text-red-500">{error}</Paragraph>}
      {!error && <p className="mt-1 text-sm text-red-500 text-white">no error</p>}
    </div>
  );
};

export default TextInput;
