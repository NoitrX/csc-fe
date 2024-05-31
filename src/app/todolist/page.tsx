"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// Icon
import { FaRegTrashAlt, FaCheck, FaSearch } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

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
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [msg, setMsg] = useState("");

  // Get All Todolist
  const getAllTodolist = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/todo?search_query=${query}&page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data, "A");
      setData(res.data.data.data);
      setPage(res.data.data.page);
      setPages(res.data.data.totalPages);
      setRows(res.data.data.totalRows);
    } catch (err) {
      console.log(err);
    }
  };

  const changePage = ({ selected }: any) => {
    setPage(selected);
    if (selected-- - 9) {
      setMsg("Jika Tidak Menemukan Data Yang anda Cari, Silahkan cari data dengan kata kunci spesial");
    } else {
      setMsg("");
    }
  };
  // Search Data
  const searchData = (e: any) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };
  // For Displaying Data
  useEffect(() => {
    getAllTodolist();
  }, [page, keyword]);
  const setComplete = async (id: any) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/api/todo/update/status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      Swal.fire("Data Updated Successfully!!", "Status was Changed", "success");
      getAllTodolist();
    } catch (err) {
      Swal.fire("Data Faield !!", "Your Data has Been Faield", "warning");
      console.log(err, "MS ");
    }
  };

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
      <div className="flex justify-between items-center mt-4 mb-6">
        <h3 className="mt-3 mb-4 font-semibold">List Tugas Dan Jawaban</h3>

        <Link href={`/todolist/create`} className="px-6 py-2 text-white bg-blue-400">
          Create +
        </Link>
      </div>

      <div className="flex justify-items-start items-start mb-3">
        <form className="flex" onSubmit={searchData}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="pt-2 pb-2 pr-6 pl-5 border-2 border-slate-200  " placeholder="Search Module" />
          <button type="submit" className="border-2 border-dark  pb-2 pt-2 px-4 bg-black text-white">
            <FaSearch />
          </button>
        </form>
      </div>
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
                            <Link href={`/todolist/update/${item.id}`} className="bg-yellow-400 px-6 py-2 text-white mx-2">
                              Update
                            </Link>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-400 px-6 py-2 text-white mx-2">
                              <FaRegTrashAlt />
                            </button>
                            <button onClick={() => setComplete(item.id)} className="bg-green-400 px-6 py-2 text-white mx-2">
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
                <p className="text-xs text-center mt-3">
                  Total Rows : {rows} Page : {rows ? page + 1 : 0} of {pages}
                </p>
                <p className="text-xs text-center mt-3"> {msg}</p>
                <div className="flex justify-center mb-4 mt-2">
                  <nav className="flex items-center gap-x-1 " key={rows} role="navigation" aria-label="pagination">
                    <ReactPaginate
                      previousLabel={"< Prev"}
                      nextLabel={"Next >"}
                      pageCount={Math.min(10, pages)}
                      onPageChange={changePage}
                      containerClassName={"flex items-center"}
                      pageLinkClassName={
                        "min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                      }
                      previousLinkClassName="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                      nextLinkClassName="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                      activeLinkClassName="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500"
                      disabledLinkClassName={"join-itembtn btn-disabled"}
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
