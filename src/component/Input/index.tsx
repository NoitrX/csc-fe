import React from "react";

export default function index({ label, type, placeholder, name, value, onChange }: any) {
  return (
    <div className="max-w-full mt-3">
      <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
