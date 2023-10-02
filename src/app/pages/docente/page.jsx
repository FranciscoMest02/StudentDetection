"use client";
import React from "react";
import Sidebar from "@/app/componentes/Sidebar";
import Navbar from "@/app/componentes/Navbar";

import "@/styles/pages/docentes_page.css";
import "tailwindcss/tailwind.css";

function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow flex">
        <Navbar />
        <div className="w-72"></div>
        <div className="componentes"></div>
        <div className="flex-grow">
          <div className="grid grid-flow-col grid-rows-4 gap-5 p-4 pt-24 pr-20 h-[90%] content-end">
            <div className="bg-gray-300 col-span-2 row-span-2 p-2 rounded-lg"></div>
            <div className="bg-gray-300 col-span-2 row-span-2 p-2 rounded-lg"></div>
            <div className="bg-gray-300 row-span-4 p-2 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
