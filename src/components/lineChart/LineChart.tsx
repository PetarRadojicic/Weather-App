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
import { useEffect, useState } from 'react';
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
      text: 'Temperature Over 24 Hours',
    },
  },
};

const labels: string[] = ['3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

export const LineChart = observer(() => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await weatherStore.getTemperature(44.804, 20.4651);
      if (weatherStore.temperature) {
        const filteredData = weatherStore.temperature.filter((_, index) =>
          [3, 6, 9, 12, 15, 18, 21, 24].includes(index)
        );
        setTemperatureData(filteredData);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature',
        data: temperatureData,
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
