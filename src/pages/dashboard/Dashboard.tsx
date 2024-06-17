import { LineChart } from "../../components/lineChart/LineChart"; // Import LineChart component
import { CitySelect } from "../../components/citySelect/CitySelect"; // Import CitySelect component
import { DaySelect } from "../../components/daySelect/DaySelect"; // Import DaySelect component
import styles from "./Dashboard.module.css"; // Import CSS module for styling

// Dashboard component to render the weather dashboard
export const Dashboard = () => {
  return (
    <div className={styles.background}>
      <div className={styles.dashboard}>
        <CitySelect /> {/* Render city selection dropdown */}
        <br></br>
        <DaySelect /> {/* Render day selection buttons */}
        <br></br>
        <LineChart /> {/* Render line chart */}
      </div>
    </div>
  );
};
