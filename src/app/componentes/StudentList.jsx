"use client";

import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
    wrap: true,
  },
  {
    name: "Asistencias",
    selector: (row) => row.attendance,
    wrap: true,
  },
];

function StudentsList(props) {
  console.log(props)
  return (
    <>
      <DataTable
        columns={columns}
        data={props.data}
        highlightOnHover
        pointerOnHover
      />
    </>
  );
}

export default StudentsList;
