"use client";

import React, { useEffect, useState } from "react";

import Sidebar from "@/app/componentes/Sidebar";
import Navbar from "@/app/componentes/Navbar";
import { fetchData } from "src/app/controllers/apiController";
import GroupCards from "@/app/componentes/GroupCards";
import { fetchGroups } from "src/app/controllers/apiController";

import "@/styles/pages/docentes_page.css";
import "tailwindcss/tailwind.css";

function Page() {
  const [dataGroups, setDataGroups] = useState([]);
  console.log("dataGroups", dataGroups);

  // Fetching data when app starts
  useEffect(() => {
    async function fetchAndSetGroups() {
      try {
        const result = await fetchGroups();
        setDataGroups(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchAndSetGroups();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="content">
        <p className="text-4xl">Cursos</p>
        <p className="text-2xl">Selecciona un curso para ver su información</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5">
          {dataGroups.map((itemProps) => (
            <GroupCards key={itemProps.id} props={itemProps} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
