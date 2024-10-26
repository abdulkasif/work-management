import React from "react";

function Input_product({ label, placeholder, icon, type = "text", value, onChange }) {
  return (
    <label className="flex flex-col mb-4">
      <p className="text-white text-base font-medium pb-2">{label}</p>
      <div className="flex items-center w-full h-12 rounded-lg border border-gray-700 bg-gray-800 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500">
        {icon && <div className="pl-4 text-gray-400">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          className="form-input flex-1 h-full bg-transparent text-white px-4 focus:outline-none placeholder-gray-400"
          value={value}
          onChange={onChange}
        />
      </div>
    </label>
  );
}

export default Input_product;
