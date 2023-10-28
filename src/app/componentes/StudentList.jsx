"use client"

import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
    wrap: true,
  },
];

function StudentsList(props) {
    return (
        <>
            <DataTable columns={columns} data={props.data} highlightOnHover pointerOnHover />
        </>
    );
}

export default StudentsList;
