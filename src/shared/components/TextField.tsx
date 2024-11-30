import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ITextField {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  valueAsNumber?: boolean;
  viewMode?: boolean;
}

const TextField = ({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  viewMode = false,
}: ITextField) => {
  return (
    <div className="grid gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        disabled={viewMode}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
        className={`w-full py-4 "shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${viewMode && "bg-gray-100"}`}
      />
      {error && <span className="text-red-700">{error.message}</span>}
    </div>
  );
};

export default TextField;
