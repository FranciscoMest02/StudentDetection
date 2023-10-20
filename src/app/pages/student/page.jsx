"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "src/app/controllers/apiController";

function page() {
  const [data, setData] = useState([]);

  data.length > 0
    ? console.log(data[0].courses[0].assistance.length)
    : console.log("array vacio");

  // Fetching data when app starts
  useEffect(() => {
    async function fetchAndSetData() {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchAndSetData();
  }, []);

  //   const data = await loadStudents();
  //   console.log(data[0].courses[0]);
  //   const assistance = data[0].courses[0].assistance;
  return <></>;
}

export default page;
