import React from "react";
import Input from "@/component/Input";
import Button from "@/component/Button";

export default function index() {
  return (
    <div>
      <form action="" encType="multipart/form-data">
        <Input label="Username" type="text" placeholder="Username..." name="username" />
        <Input label="Password" type="password" placeholder="Password..." name="password" />
        <div className="flex justify-center items-center mt-4 mb-2 ">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}
