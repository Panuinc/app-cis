"use client";

import React from "react";
import { Home } from "lucide-react";

export default function Header({ Header }) {
  return (
    <>
      <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-[600]">
          <Home /> {Header}
        </div>
      </div>
    </>
  );
}
