import { render, screen } from '@testing-library/react';
import BigWeatherCard from '../components/BigWeatherCard';

const dayData = {
  day: 'Monday',
  date: '12/06/2024',
  sunrise: '2024-06-12T05:00:00Z',
  sunset: '2024-06-12T21:00:00Z',
  max: 25,
  min: 15,
  rain: 2.3,
  wind: 10,
  windDir: 'NW',
  iconURL: '/icons/clear-day.png',
  summary: 'Clear sky',
  temp: 20,
};

describe('BigWeatherCard', () => {
  test('renders day and date', () => {
    render(<BigWeatherCard dayData={dayData} />);
    expect(screen.getByText(dayData.day)).toBeInTheDocument();
    expect(screen.getByText(dayData.date)).toBeInTheDocument();
  });

  test('renders weather icon and summary', () => {
    render(<BigWeatherCard dayData={dayData} />);
    const img = screen.getByAltText(dayData.summary);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', dayData.iconURL);
    expect(screen.getByText(dayData.summary)).toBeInTheDocument();
  });

  test('renders temperatures and wind info', () => {
    render(<BigWeatherCard dayData={dayData} />);
    
    const maxLabel = screen.getByText(/^Max:/);
    expect(maxLabel.parentElement).toHaveTextContent('25°C');
    
    const minLabel = screen.getByText(/^Min:/);
    expect(minLabel.parentElement).toHaveTextContent('15°C');
    
    const windLabel = screen.getByText(/^Wind:/);
    expect(windLabel.parentElement).toHaveTextContent('10 km/h');
  });

  test('renders the weather summary text with times formatted', () => {
    render(<BigWeatherCard dayData={dayData} />);
    expect(screen.getByText(/sunrise will be at/i)).toBeInTheDocument();
    expect(screen.getByText(/sunset will be at/i)).toBeInTheDocument();
    expect(screen.getByText(/highest temperature/i)).toBeInTheDocument();
  });
});
