import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './LineChart.module.css';
import { weatherStore } from '../../stores/WeatherStore';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Temperature Over Time',
    },
  },
};

const getDayOfWeek = (dayIndex: number): string => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex % 7];
};

const generateLabels = (days: number, startDate: Date): string[] => {
  const baseLabels = ['3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
  const labels: string[] = [];

  for (let day = 0; day < days; day++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + day);
    const dayOfWeek = getDayOfWeek(currentDay.getDay());

    baseLabels.forEach(label => {
      labels.push(`${dayOfWeek} ${label}`);
    });
  }

  return labels;
};

const getIndices = (days: number) => {
  const indices = [];
  for (let i = 0; i < days; i++) {
    indices.push(...[3, 6, 9, 12, 15, 18, 21, 24].map(index => index + i * 24));
  }
  return indices;
};

export const LineChart = observer(() => {
  useEffect(() => {
    const fetchData = async () => {
      await weatherStore.getTemperature();
    };

    fetchData();
  }, []);

  const startDate = new Date();
  const labels = generateLabels(weatherStore.days, startDate);
  const indices = getIndices(weatherStore.days);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: weatherStore.temperature ? weatherStore.temperature.filter((_, index) => indices.includes(index)) : [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Line options={options} data={data} />
    </div>
  );
});
