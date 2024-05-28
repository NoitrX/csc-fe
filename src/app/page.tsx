import Button from "@/component/Button";
import Input from "@/component/Input";
import Form from "@/component/Form";

export default function Home() {
  return (
    <div className="max-w-screen w-full flex justify-center items-center content-center min-h-screen">
      <div className="flex flex-col w-1/3 bg-white border border-gray-200 shadow-sm  p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        <h2 className="font-bold text-lg mb-2">Todolist</h2>
        <h1 className="text-2xl font-bold mb-4">Welcome Back, Login.</h1>
        <Form />
      </div>
    </div>
  );
}
