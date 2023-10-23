import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
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
    name: "Jorge Perez",
    attendance: 95,
  },
  {
    id: 2,
    name: "Ana Rodriguez",
    attendance: 88,
  },
  {
    id: 3,
    name: "Carlos Sánchez",
    attendance: 92,
  },
  {
    id: 4,
    name: "Laura Martinez",
    attendance: 96,
  },
  {
    id: 5,
    name: "Pedro Lopez",
    attendance: 90,
  },
  {
    id: 6,
    name: "María Garcia",
    attendance: 94,
  },
  {
    id: 7,
    name: "Eduardo Fernández",
    attendance: 91,
  },
  {
    id: 8,
    name: "Isabel Torres",
    attendance: 89,
  },
  {
    id: 9,
    name: "Luis Ramirez",
    attendance: 97,
  },
  {
    id: 10,
    name: "Sofia Gomez",
    attendance: 93,
  },
  {
    id: 9,
    name: "Luis Ramirez",
    attendance: 97,
  },
  {
    id: 7,
    name: "Eduardo Fernández",
    attendance: 91,
  },
  {
    id: 8,
    name: "Isabel Torres",
    attendance: 89,
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

function StudentsTable(props) {
  return (
    <DataTable
      columns={columns}
      data={props.data}
      highlightOnHover
      pointerOnHover
    />
  );
}

export default StudentsTable;
