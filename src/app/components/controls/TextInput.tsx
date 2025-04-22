import React from "react";

export default function TextInput({ label, icon: Icon, error, ...props }: any) {
  return (
    <div className="w-full   ">
      {label && (
        <label className=" uppercase text-left block text-sm font-medium text-gray-700 my-1">
          {label}
        </label>
      )}
      <div
        className={` flex items-center border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500`}
      >
        {Icon && (
          <div className="pl-3 text-gray-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className="w-full py-2 px-3 focus:outline-none rounded-md text-sm text-gray-800"
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
