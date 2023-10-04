import React from "react";
import { Chart } from "react-google-charts";

function AttendanceChart() {
  const data = [
    ["Grupo", "Attendance"],
    ["Math", 94],
    ["Art", 49],
    ["English", 93],
    ["Physics", 45],
    ["Spanish", 85],
    ["Chemistry", 95],
    ["Literature", 75],
  ];

  const options = {
    title: "Porcentaje de Aistencia por Grupos",
    width: 950,
    height: 300,
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
  };

  return <Chart chartType="ColumnChart" data={data} options={options} />;
}

export default AttendanceChart;
