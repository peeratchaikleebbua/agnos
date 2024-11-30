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
}

const TextField = ({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}: ITextField) => {
  return (
    <div className="grid gap-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
        className={`w-full py-4 "shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"`}
      />
      {error && <span className="text-red-700">{error.message}</span>}
    </div>
  );
};

export default TextField;
