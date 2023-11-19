"use client"

import React from "react";
import { Chart } from "react-google-charts";

function AttendanceChart(props) {
  const data = props.data;

  const options = {
    width: 950,
    height: 300,
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
  };

  return props.data.lenght > 0 ? 
  <Chart chartType="ColumnChart" data={data} options={options} />
  :
  <p>No data</p>
}

export default AttendanceChart;
