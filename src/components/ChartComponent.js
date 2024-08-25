import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import "./ChartComponent.css";
import "./Dashboard.css";

const ChartComponent = ({ id, chartData, chartOptions, chartType }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        ...chartOptions,
        maintainAspectRatio: false,
        responsive: true,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, chartOptions, chartType]);

  return (
    <div className="chart-container">
      <canvas id={id} ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
