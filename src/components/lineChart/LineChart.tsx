import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import necessary components from Chart.js
import { Line } from "react-chartjs-2"; // Import Line chart component from react-chartjs-2
import styles from "./LineChart.module.css"; // Import CSS module for styling
import { weatherStore } from "../../stores/WeatherStore"; // Import the weather store
import { useEffect } from "react"; // Import useEffect hook from React
import { observer } from "mobx-react-lite"; // Import observer for MobX integration

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
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

// Function to generate labels for the x-axis
const generateLabels = (timeData: string[], days: number): string[] => {
  return timeData.slice(0, days * 24).map((time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-US", { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false });
  });
};

// Function to get indices for data points based on the interval
const getIndices = (timeData: string[], days: number, intervalHours: number) => {
  const totalHours = days * 24;
  const indices = [];
  for (let i = 0; i < totalHours; i += intervalHours) {
    indices.push(i);
  }
  return indices;
};

// Observer component to render the line chart
export const LineChart = observer(() => {
  // Fetch temperature data when the component mounts or days change
  useEffect(() => {
    const fetchData = async () => {
      await weatherStore.getTemperature();
    };

    fetchData();
  }, [weatherStore.days]);

  const labels = generateLabels(weatherStore.time, weatherStore.days); // Generate labels for the x-axis
  const indices = getIndices(weatherStore.time, weatherStore.days, 3); // Get indices for data points

  // Prepare data for the chart
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
