import React from "react";

interface AlertProps {
  message: string;
  type: string;
}
export default function Alert({ message, type }: AlertProps) {
  return (
    <div className={`mt-2 ${type} text-sm text-white rounded-lg p-4`} role="alert">
      <span className="font-bold"></span> {message}
    </div>
  );
}
