import { LineChart } from "../../components/lineChart/LineChart";
import { CitySelect } from "../../components/citySelect/CitySelect";
import { DaySelect } from "../../components/daySelect/DaySelect";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={styles.background}>
      <div className={styles.dashboard}>
        <CitySelect />
        <br></br>
        <DaySelect />
        <br></br>
        <LineChart />
      </div>
    </div>
  );
};
