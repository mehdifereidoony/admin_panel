// libs/chart.js
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

// فقط یک بار در کل برنامه ثبت کن
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Filler
);

export default Chart;
