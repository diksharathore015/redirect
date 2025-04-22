/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  error?: string;
  className?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  touched,
  error,
  className,
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        {...rest}
       
        className={` border rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none ${className} ${
          touched && error ? "border-red-500" : ""
        }`}
      />
      {touched && error && (
        <p className="text-red-500 text-xs italic">{error}</p>
      )}
    </div>
  );
};

export default Input;
