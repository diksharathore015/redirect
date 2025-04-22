import React from "react";

export default function TextAreaInput({
  label,
  error,
  ...props
}: any) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500`}
      >
        <textarea
          className="w-full py-2 px-3 focus:outline-none rounded-md text-sm text-gray-800 resize-none"
          
           // Default number of rows, can be customized via props
          {...props}
        ></textarea>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
