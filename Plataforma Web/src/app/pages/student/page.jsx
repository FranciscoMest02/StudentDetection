"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "src/app/controllers/apiController";
import StudentsTable from "@/app/componentes/StudentsTable";

function page() {
  const [data, setData] = useState([]);
  const [dataAttendance, setDataAttendance] = useState([]);

  data.length > 0 ? console.log(data) : console.log("array vacio");
  dataAttendance.length > 0
    ? console.log(dataAttendance)
    : console.log("attendance vacio");

  // Fetching data when app starts
  useEffect(() => {
    async function fetchAndSetData() {
      try {
        const result = await fetchData();
        setData(result);

        let aux = result.map((person) => ({
          id: person.id,
          name: person.name,
          attendance: person.courses.reduce(
            (totalAttendance, course) =>
              totalAttendance + course.assistance.length,
            0
          ),
        }));
        setDataAttendance(aux);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchAndSetData();
  }, []);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     let aux = data.map((person) => ({
  //       id: person.id,
  //       name: person.name,
  //     }));
  //     setDataAttendance(aux);
  //   }
  // }, [data]);

  return (
    <>
      <StudentsTable data={dataAttendance} />
      {/* {data.length > 0 ? (
        data.map((item) => (
          <div key={item.name}>
            <h1>{item.name}</h1>
            <p>{item.courses[0].assistance.length}</p>
          </div>
        ))
      ) : (
        <></>
      )} */}
    </>
  );
}

export default page;
