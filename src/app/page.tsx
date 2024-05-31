"use client";

"use client";

import Form from "@/component/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Alert from "@/component/Alert";
export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/todolist");
    }
  }, [router]);
  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "bg-red-500",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // console.log(form);
  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:9000/api/todo/login/user", form);
      console.log(res);
      localStorage.setItem("token", res.data.data.token);
      router.push("/todolist");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setAlert({ status: true, message: err.response.data.msg ?? "Internal Server Error", type: "bg-red-500" });
    }
  };

  return (
    <div className="max-w-screen w-full flex justify-center items-center content-center min-h-screen">
      <div className="flex flex-col w-1/3 bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        {alert.status && <Alert message={alert.message} type={alert.type} />}
        <h2 className="font-bold text-lg mb-2">Todolist</h2>
        <h1 className="text-2xl font-bold mb-4">Welcome Back, Login.</h1>
        <Form form={form} isLoading={isLoading} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
