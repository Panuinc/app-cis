"use client";
import Image from "next/image";
import React from "react";
import { Input, Button } from "@heroui/react";

export default function UIIndex() {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full xl:w-6/12 p-2 gap-2 border-2 border-dark border-dashed bg-white shadow-md rounded-3xl">
        <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-4 border-2 border-dark border-dashed">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            <Image
              src="/logoCompany/com-1.png"
              alt="mascot-1"
              width={50}
              height={50}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            Welcome To Channakorn Internal System
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            <Input
              name="email"
              type="email"
              label="อีเมล"
              labelPlacement="outside"
              placeholder="your@email.com"
              variant="bordered"
              color="secondary"
              size="md"
              isClearable
              isRequired
              // onChange={handleChange}
              // validate={(value) => (!value.includes("@") ? "อีเมลไม่ถูกต้อง" : true)}
              errorMessage="กรุณากรอกอีเมลให้ถูกต้อง"
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            4
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
            5
          </div>
        </div>
        <div className="xl:flex hidden flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed rounded-2xl">
          <div className="flex items-center justify-center w-full min-h-96 p-2 gap-2 border-2 border-dark border-dashed bg-default rounded-tl-xl rounded-bl-[60px] rounded-tr-xl rounded-br-xl">
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
