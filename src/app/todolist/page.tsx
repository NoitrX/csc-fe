"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Todolist() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);
  return (
    <div>
      <div>s</div>
    </div>
  );
}
