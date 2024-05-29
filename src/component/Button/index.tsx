import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  action?: any;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: any;
  disabled?: any;
}

export default function Button({ children, action, type, loading, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={action}
      className="py-3 px-4 w-full max-w-full text-center inline-flex justify-center items-center gap-x-2 text-sm font-semibold  border border-transparent bg-black text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
      disabled={disabled}
    >
      {loading ? "Loading..." : children || ""}
      {""}
    </button>
  );
}
