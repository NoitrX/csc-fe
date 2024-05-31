"use client";

// From Next
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
// Component
import Alert from "@/component/Alert";
import Input from "@/component/Input";
import Button from "@/component/Button";
// Icon
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";
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
    try {
      setIsLoading(true);
      e.preventDefault();
      setIsLoading(true);
      const res = await axios.post("http://localhost:9000/api/todo/create", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      Swal.fire({
        title: "Data has been Added",
        text: "Data Berhasil ditambahkan",
        icon: "success",
      });
      router.push("/todolist");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err, "a");
      setAlert({
        status: true,
        message: err.response.data.msg ?? "Internal Server Error",
        type: "bg-red-500",
      });
    }
  };
  return (
    <div className="w-full px-6">
      <div className="flex justify-start items-center">
        <Link className="mr-4" href={"/todolist"}>
          <IoArrowBackCircleOutline size={24} />
        </Link>
        <h3 className="mt-3 mb-2 font-semibold">Create Todolist</h3>
      </div>
      <div className="flex flex-col w-full bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        {alert.status && <Alert message={alert.message} type={alert.type} />}
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
