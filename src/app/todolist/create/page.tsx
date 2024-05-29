"use client";
import React, { useEffect, useState } from "react";
import Input from "@/component/Input";
import Button from "@/component/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "bg-red-500",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // /create
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.post("http://localhost:9000/api/todo/create", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    router.push("/todolist");
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full px-6">
      <h3 className="mt-3 mb-4 font-semibold">Create Todolist</h3>
      <div className="flex flex-col w-full bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        <form>
          <Input value={form.name} onChange={handleChange} label="Todolist Name" type={"text"} name={"name"} placeholder={"Fill Todolist Name.."} />
          <Button action={handleSubmit} type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
