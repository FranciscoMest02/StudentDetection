"use client";

import React, { useEffect, useState } from "react";

import Sidebar from "@/app/componentes/Sidebar";
import Navbar from "@/app/componentes/Navbar";
import GroupsTable from "@/app/componentes/GroupsTable";
import StudentsTable from "@/app/componentes/StudentsTable";
import AttendanceChart from "@/app/componentes/AttendanceChart";
import { fetchData } from "src/app/controllers/apiController";

import "@/styles/pages/docentes_page.css";
import "tailwindcss/tailwind.css";

function Page() {
  const [data, setData] = useState([]);
  const [dataAttendance, setDataAttendance] = useState([]);
  const [dataGroups, setdDtaGroups] = useState([]);

  // Fetching data when app starts
  useEffect(() => {
    async function fetchAndSetData() {
      try {
        const result = await fetchData();
        setData(result);

        let auxAttendance = result.map((person) => ({
          id: person.id,
          name: person.name,
          attendance: person.courses.reduce(
            (totalAttendance, course) =>
              totalAttendance + course.assistance.length,
            0
          ),
        }));
        setDataAttendance(auxAttendance);

        let auxGroups = result.map((person) => ({
          id: person.courses.map((course) => course.id).join("-"), // Create a unique ID for the course
          class: person.courses[0].name, // Assuming all courses have the same name for a person
          studentsNumber: person.courses.length,
          attendance: person.courses.reduce(
            (totalAttendance, course) =>
              totalAttendance + course.assistance.length,
            0
          ),
        }));
        setdDtaGroups(auxGroups);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchAndSetData();
  }, []);
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
              <GroupsTable data={dataGroups} />
            </div>
            <div className="bg-gray-300 col-span-1 row-span-2 p-2 rounded-lg">
              <AttendanceChart />
            </div>
            <div className="bg-gray-300 row-span-5 p-2 rounded-lg">
              <StudentsTable data={dataAttendance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
