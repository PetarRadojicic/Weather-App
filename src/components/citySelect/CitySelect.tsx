import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { weatherStore } from '../../stores/WeatherStore';

export const CitySelect = observer(() => {
  const handleChange = (value: string) => {
    const [lat, lon] = value.split(',').map(Number);
    weatherStore.setCoordinates(lat, lon);
    weatherStore.getTemperature();
  };

  return (
    <div>
        Select a city: &nbsp;
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select City"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={[
          { value: '44.804,20.4651', label: 'Belgrade' },
          { value: '40.7128,-74.0060', label: 'New York' },
          { value: '48.8566,2.3522', label: 'Paris' },
          { value: '35.6895,139.6917', label: 'Tokyo' },
          { value: '-33.8688,151.2093', label: 'Sydney' },
          { value: '51.5074,-0.1278', label: 'London' },
          { value: '55.7558,37.6173', label: 'Moscow' },
          { value: '34.0522,-118.2437', label: 'Los Angeles' },
          { value: '39.9042,116.4074', label: 'Beijing' },
          { value: '-23.5505,-46.6333', label: 'São Paulo' },
          { value: '19.0760,72.8777', label: 'Mumbai' },
          { value: '28.7041,77.1025', label: 'Delhi' },
          { value: '41.9028,12.4964', label: 'Rome' },
          { value: '37.7749,-122.4194', label: 'San Francisco' },
          { value: '-22.9068,-43.1729', label: 'Rio de Janeiro' },
          { value: '40.4168,-3.7038', label: 'Madrid' },
        ]}
        onChange={handleChange}
      />
    </div>
  );
});
