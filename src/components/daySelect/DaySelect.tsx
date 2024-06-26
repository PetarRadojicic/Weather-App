import React from 'react';
import { weatherStore } from '../../stores/WeatherStore'; // Import the weather store
import { Button, Space } from 'antd'; // Import components from Ant Design

// Function to handle button clicks and set the number of days in the weather store
const handleChange = (event: React.MouseEvent<HTMLElement>) => {
  const value = Number(event.currentTarget.getAttribute('value'));
  weatherStore.setDays(value);
};

// Component to render buttons for selecting the number of days
export const DaySelect: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Button value={1} onClick={handleChange}>Today</Button>
    <Button value={2} onClick={handleChange}>2 days</Button>
    <Button value={3} onClick={handleChange}>3 days</Button>
    <Button value={4} onClick={handleChange}>4 days</Button>
    <Button value={5} onClick={handleChange}>5 days</Button>
    <Button value={6} onClick={handleChange}>6 days</Button>
    <Button value={7} onClick={handleChange}>7 days</Button>
  </Space>
);
