import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { weatherStore } from '../../stores/WeatherStore';

const App = observer(() => {
  const handleChange = (value: { lat: number; lon: number; }) => {
    const { lat, lon } = value;
    weatherStore.setCoordinates(lat, lon);
    weatherStore.getTemperature(lat, lon);
  };

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          { value: { lat: 44.804, lon: 20.4651 }, label: 'Belgrade' },
          { value: { lat: 40.7128, lon: -74.0060 }, label: 'New York' },
          { value: { lat: 48.8566, lon: 2.3522 }, label: 'Paris' },
          { value: { lat: 35.6895, lon: 139.6917 }, label: 'Tokyo' },
          { value: { lat: -33.8688, lon: 151.2093 }, label: 'Sydney' },
          { value: { lat: 51.5074, lon: -0.1278 }, label: 'London' },
          { value: { lat: 55.7558, lon: 37.6173 }, label: 'Moscow' },
          { value: { lat: 34.0522, lon: -118.2437 }, label: 'Los Angeles' },
          { value: { lat: 39.9042, lon: 116.4074 }, label: 'Beijing' },
          { value: { lat: -23.5505, lon: -46.6333 }, label: 'São Paulo' },
          { value: { lat: 19.076, lon: 72.8777 }, label: 'Mumbai' },
          { value: { lat: 28.7041, lon: 77.1025 }, label: 'Delhi' },
          { value: { lat: 41.9028, lon: 12.4964 }, label: 'Rome' },
          { value: { lat: 37.7749, lon: -122.4194 }, label: 'San Francisco' },
          { value: { lat: 35.6762, lon: 139.6503 }, label: 'Tokyo' },
          { value: { lat: -22.9068, lon: -43.1729 }, label: 'Rio de Janeiro' },
          { value: { lat: 40.4168, lon: -3.7038 }, label: 'Madrid' },
        ]}
        onChange={handleChange}
      />
      {weatherStore.loading && <p>Loading...</p>}
      {weatherStore.error && <p>Error: {weatherStore.error.message}</p>}
      {weatherStore.temperature && <p>Temperature: {weatherStore.temperature.join(', ')}</p>}
      {weatherStore.latitude && weatherStore.longitude && (
        <p>Coordinates: {weatherStore.latitude}, {weatherStore.longitude}</p>
      )}
    </div>
  );
});

export default App;
