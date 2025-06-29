"use client";
import Image from "next/image";
import React from "react";
import { Input, Button } from "@heroui/react";

export default function UIIndex() {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full xl:w-6/12 p-2 gap-2 bg-white shadow-md rounded-3xl">
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-4">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Image
              src="/logoCompany/com-1.png"
              alt="mascot-1"
              width={50}
              height={50}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            Welcome To Channakorn Internal System
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="email"
              type="text"
              label="Username"
              labelPlacement="outside"
              placeholder="xxx xxx"
              variant="bordered"
              color="secondary"
              isClearable
              isRequired
              // onChange={handleChange}
              // validate={(value) => (!value.includes("@") ? "อีเมลไม่ถูกต้อง" : true)}
              // value={empUserCredential}
              // errorMessage={errors.roleName}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="Password"
              type="password"
              label="Password"
              labelPlacement="outside"
              placeholder="xxx xxx"
              variant="bordered"
              color="secondary"
              isClearable
              isRequired
              // onChange={handleChange}
              // validate={(value) => (!value.includes("@") ? "อีเมลไม่ถูกต้อง" : true)}
              // value={empUserCredential}
              // errorMessage={errors.roleName}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Button
              type="submit"
              color="primary"
              className="flex items-center justify-center w-6/12 h-full p-3 gap-2"
            >
              Login
            </Button>
          </div>
        </div>
        <div className="xl:flex hidden flex-col items-center justify-center w-full h-full p-2 gap-2 rounded-2xl">
          <div className="flex items-center justify-center w-full min-h-96 p-2 gap-2 bg-default rounded-tl-xl rounded-bl-[60px] rounded-tr-xl rounded-br-xl">
            <Image
              src="/mascot/mascot-1.png"
              alt="mascot-1"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
}
