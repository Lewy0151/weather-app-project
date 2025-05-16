import { render, screen, fireEvent } from '@testing-library/react';
import SmallWeatherCard from '../components/SmallWeatherCard';

const dayData = {
  day: 'Tue',
  icon: 'clear-day',
  summary: 'Clear sky',
  temp: 22,
};

describe('SmallWeatherCard', () => {
  test('renders day, icon and temperature', () => {
    render(<SmallWeatherCard dayData={dayData} isSelected={false} onClick={() => {}} />);
    expect(screen.getByText(dayData.day)).toBeInTheDocument();
    const img = screen.getByAltText(dayData.summary);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `/icons/${dayData.icon}.png`);
    expect(screen.getByText(`${dayData.temp}°C`)).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<SmallWeatherCard dayData={dayData} isSelected={false} onClick={handleClick} />);
    fireEvent.click(screen.getByText(dayData.day));
    expect(handleClick).toHaveBeenCalled();
  });

  test('applies border class when selected', () => {
    const { container } = render(<SmallWeatherCard dayData={dayData} isSelected={true} onClick={() => {}} />);
    expect(container.querySelector('div.border-2')).toBeInTheDocument();
  });
});
