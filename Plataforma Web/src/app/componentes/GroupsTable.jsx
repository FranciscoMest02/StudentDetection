import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Clase",
    selector: (row) => row.class,
    wrap: true,
  },
  {
    name: "Numero de Alumnos",
    selector: (row) => row.studentsNumber,
    wrap: true,
  },
  {
    name: "Porcentaje de Asistencia",
    selector: (row) => row.attendance,
    wrap: true,
  },
];

// esta data debe extraerse de un nuevo documento y procesarse para sacar % de asistencia
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

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

function GroupsTable(props) {
  console.log("props", props);
  return (
    <DataTable
      columns={columns}
      data={props.data}
      highlightOnHover
      pointerOnHover
    />
  );
}

export default GroupsTable;
