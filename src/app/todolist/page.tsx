"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// Icon
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Todolist() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router]);
  const formatDate = (datetimeString: string | number | Date) => {
    const date = new Date(datetimeString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };
  //State For Get Data
  const [data, setData] = useState([]);

  // Get All Todolist
  const getAllTodolist = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // For Displaying Data
  useEffect(() => {
    getAllTodolist();
  }, []);

  // Handle Delete
  const handleDelete = (id: any) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:9000/api/todo/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        Swal.fire("Data Deleted Successfully!!", "Your Data has Been Deleted", "success");
        getAllTodolist();
      }
    });
  };

  return (
    <div className="w-full px-6">
      <h3 className="mt-3 mb-4 font-semibold">List Tugas Dan Jawaban</h3>
      <div className="flex flex-col w-full bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3  text-xs text-center font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Log
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item: any, index: any) => {
                      return (
                        <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            <Link href={`/todolist/create`} className="px-6 py-2 text-white bg-blue-400">
                              Create +
                            </Link>
                            <button className="bg-yellow-400 px-6 py-2 text-white mx-2">
                              <MdEdit />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-400 px-6 py-2 text-white mx-2">
                              <FaRegTrashAlt />
                            </button>
                            <button className="bg-green-400 px-6 py-2 text-white mx-2">
                              <FaCheck />
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-800 dark:text-neutral-200">{item.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            {formatDate(item.createdAt)} | {item.createdByUser.name}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
