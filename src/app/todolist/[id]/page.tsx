"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// Component
import Input from "@/component/Input";
import Button from "@/component/Button";

export default function DetailPage() {
  const [myData, setMyData] = useState([]);
  const [form, setForm] = useState({
    file: null,
  });
  const params = useParams();
  const token = localStorage.getItem("token");
  const getOneTodolist = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/todo/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:9000/api/todo//todolist_attachment/create/${params.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };
  useEffect(() => {
    getOneTodolist();
  }, []);

  return (
    <div className="w-full px-6">
      <div className="flex justify-between items-center">
        <h3 className="mt-3 mb-4 font-semibold"> Detail Todolist</h3>
        <button type="button" data-hs-overlay="#hs-slide-down-animation-modal" className="px-6 py-2 text-white bg-blue-400">
          Upload Document
        </button>
      </div>
      <div className="flex flex-col w-full bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        <p>Nama : {myData.name}</p>
        <p>Created By : {myData.createdByUser ? myData.createdByUser.name : "Unknown"}</p>
        <p>Last Updated By : {myData.updatedByUser ? myData.updatedByUser.name : "Unknown"}</p>
      </div>
      <div id="hs-slide-down-animation-modal" className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
              <h3 className="font-bold text-gray-800 dark:text-white">Upload Document</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <form>
              <div className="p-4 overflow-y-auto">
                <Input onChange={handleChange} label={"File"} type={"file"} name={"file"} />
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <Button action={handleSubmit} type="submit">
                  Upload
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
