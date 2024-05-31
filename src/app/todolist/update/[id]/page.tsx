"use client";
import React, { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";

export default function Update() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const params = useParams();
  const options = ["COMPLETED", "ON_PROGRESS", "PENDING"];

  const [form, setForm] = useState({
    name: "",
    status: "",
  });
  if (!options.includes(form.status)) {
    options.push(form.status);
  }
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOneTodolist = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/todo/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm({ ...form, name: res.data.data.name, status: res.data.data.status });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.put(`http://localhost:9000/api/todo/update/${params.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      Swal.fire({
        title: "Data has been Updated",
        text: "Data Berhasil Diedit",
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
  useEffect(() => {
    fetchOneTodolist();
  }, []);

  return (
    <div className="w-full px-6">
      <div className="flex justify-start items-center">
        <Link className="mr-4" href={"/todolist"}>
          <IoArrowBackCircleOutline size={24} />
        </Link>
        <h3 className="mt-3 mb-2 font-semibold">Update Todolist</h3>
      </div>
      <div className="flex flex-col w-full bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        {alert.status && <Alert message={alert.message} type={alert.type} />}
        <form>
          <Input value={form.name} onChange={handleChange} label="Todolist Name" type={"text"} name={"name"} placeholder={"Fill Todolist Name.."} />
          <label htmlFor="hs-select-label" className="block text-sm font-medium mb-1 dark:text-white mt-3">
            Status
          </label>
          <select
            className="py-3 px-4 pe-9 block w-full border mt-3 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            name="status"
            id=""
            onChange={handleChange}
            value={form.status}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Button action={handleSubmit} type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
