import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./LineChart.module.css";
import { weatherStore } from "../../stores/WeatherStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Temperature Over Time",
    },
  },
};

const generateLabels = (timeData: string[], days: number): string[] => {
  return timeData.slice(0, days * 24).map((time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false });
  });
};

const getIndices = (timeData: string[], days: number, intervalHours: number) => {
  const totalHours = days * 24;
  const indices = [];
  for (let i = 0; i < totalHours; i += intervalHours) {
    indices.push(i);
  }
  return indices;
};

export const LineChart = observer(() => {
  useEffect(() => {
    const fetchData = async () => {
      await weatherStore.getTemperature();
    };

    fetchData();
  }, [weatherStore.days]);

  const labels = generateLabels(weatherStore.time, weatherStore.days);
  const indices = getIndices(weatherStore.time, weatherStore.days, 3);

  const data = {
    labels: indices.map(index => labels[index]),
    datasets: [
      {
        label: "Temperature",
        data: weatherStore.temperature
          ? weatherStore.temperature.slice(0, weatherStore.days * 24).filter((_, index) =>
              indices.includes(index)
            )
          : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={data} />
    </div>
  );
});
