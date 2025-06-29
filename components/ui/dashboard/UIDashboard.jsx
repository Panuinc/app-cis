import React from "react";

export default function UIDashboard() {
  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-center w-full p-2 gap-2">
        <div className="flex items-center justify-start w-6/12 h-full p-2 gap-2 text-3xl font-[600]">
          Overview
        </div>
        <div className="flex items-center justify-center w-3/12 h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Filter Date
        </div>
        <div className="flex items-center justify-center w-3/12 h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Filter Year
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Dash Board 1
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Dash Board 2
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Dash Board 3
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Dash Board 4
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Dash Board 5
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-white rounded-3xl shadow-md">
          Dash Board 6
        </div>
      </div>
    </>
  );
}
