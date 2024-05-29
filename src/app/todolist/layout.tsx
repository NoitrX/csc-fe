import React from "react";

export default function TodolistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      A<div>{children}</div>
    </div>
  );
}
