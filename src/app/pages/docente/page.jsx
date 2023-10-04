"use client";
import React from "react";
import Sidebar from "@/app/componentes/Sidebar";
import Navbar from "@/app/componentes/Navbar";
import GroupsTable from "@/app/componentes/GroupsTable";
import StudentsTable from "@/app/componentes/StudentsTable";
import AttendanceChart from "@/app/componentes/AttendanceChart";

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
          <div className="grid grid-flow-col grid-rows-5 gap-5 p-4 pt-24 pr-20 h-[100%]">
            <div className="bg-gray-300 col-span-1 row-span-3 p-2 rounded-lg">
              <GroupsTable />
            </div>
            <div className="bg-gray-300 col-span-1 row-span-2 p-2 rounded-lg">
              <AttendanceChart />
            </div>
            <div className="bg-gray-300 row-span-5 p-2 rounded-lg">
              <StudentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
