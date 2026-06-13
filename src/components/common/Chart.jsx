import { useEffect, useRef } from "react";
import "../../libs/chart";

const LineChart = ({
  id,
  height = 400,
  data,
  options,
  className = "col-12",
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new window.Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, options]);

  return (
    <div className={className}>
      <canvas ref={chartRef} id={id} height={height}></canvas>
    </div>
  );
};

export default LineChart;
