'use client';

import { Container } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

export default function AnalyticsPage() {

  const data = [
    ["Day", "Sales"],
    ["Monday", 1000],
    ["Tuesday", 1170],
    ["Wednesday", 660],
    ["Thursday", 1030],
    ["Friday", 800],
  ];

  const options = {
    title: "Sales from Monday to Friday",
    hAxis: { title: "Day" },
    vAxis: { title: "Sales" },
    legend: "none",
  };

  return (
    <Container maxWidth="md" component={'main'} sx={{ mt: 10 }}>

      <Chart
        chartType='ColumnChart'
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      <p>Report</p>
    </Container>
  )
}
