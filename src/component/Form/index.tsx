import React from "react";
import Input from "@/component/Input";
import Button from "@/component/Button";

export default function index({ form, handleChange, handleSubmit, isLoading }: any) {
  return (
    <div>
      <form>
        <Input label="Username" type="text" value={form.username} onChange={handleChange} placeholder="Username..." name="username" />
        <Input label="Password" type="password" value={form.password} onChange={handleChange} placeholder="Password..." name="password" />
        <div className="flex justify-center items-center mt-4 mb-2 ">
          <Button loading={isLoading} disabled={isLoading} action={handleSubmit} type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
