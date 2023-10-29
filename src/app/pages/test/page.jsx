"use client";

import React, { useEffect, useState } from "react";

import Sidebar from "@/app/componentes/Sidebar";
import Navbar from "@/app/componentes/Navbar";
import { fetchData } from "src/app/controllers/apiController";
import GroupCards from "@/app/componentes/GroupCards";

import "@/styles/pages/docentes_page.css";
import "tailwindcss/tailwind.css";

function Page() {
  const [dataAttendance, setDataAttendance] = useState([]);
  const [dataGroups, setdDtaGroups] = useState([]);

  const data = [
    {
      id: 1,
      class: "Mathematics",
      studentsNumber: 17,
      attendance: 95,
    },
    {
      id: 2,
      class: "Biology",
      studentsNumber: 19,
      attendance: 9,
    },
    {
      id: 3,
      class: "Literature",
      studentsNumber: 22,
      attendance: 97,
    },
    {
      id: 1,
      class: "Geometry",
      studentsNumber: 17,
      attendance: 85,
    },
    {
      id: 1,
      class: "Physics",
      studentsNumber: 21,
      attendance: 90,
    },
    {
      id: 1,
      class: "Music",
      studentsNumber: 20,
      attendance: 80,
    },
    {
      id: 1,
      class: "Spanish",
      studentsNumber: 11,
      attendance: 100,
    },
    {
      id: 1,
      class: "Geometry",
      studentsNumber: 21,
      attendance: 90,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((itemProps) => (
        <GroupCards key={itemProps.id} props={itemProps} />
      ))}
    </div>
  );
}

export default Page;
