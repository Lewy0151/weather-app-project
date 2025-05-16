import { render, screen, fireEvent } from '@testing-library/react';
import WeekdayBar from '../components/WeekdayBar';  

jest.mock('../components/DayCard', () => ({ day, weather, setIndexFunction, selectedIndex }) => {
  return (
    <div data-testid={`daycard-${day}`} onClick={() => setIndexFunction(day)}>
      {weather.day} - Selected: {selectedIndex === day ? 'Yes' : 'No'}
    </div>
  );
});

describe('WeekdayBar', () => {
  const weatherData = [
    { day: 'Mon', temp: 20 },
    { day: 'Tue', temp: 21 },
    { day: 'Wed', temp: 22 },
    { day: 'Thu', temp: 23 },
    { day: 'Fri', temp: 24 },
    { day: 'Sat', temp: 25 },
    { day: 'Sun', temp: 26 },
  ];

  let mockSetIndex;

  beforeEach(() => {
    mockSetIndex = jest.fn();
  });

  test('renders 7 DayCard components', () => {
    render(<WeekdayBar weather={weatherData} setIndexFunction={mockSetIndex} selectedIndex={3} />);
    const dayCards = screen.getAllByTestId(/daycard-/);
    expect(dayCards.length).toBe(7);
  });

  test('passes correct selectedIndex to DayCard', () => {
    render(<WeekdayBar weather={weatherData} setIndexFunction={mockSetIndex} selectedIndex={4} />);
    expect(screen.getByTestId('daycard-4').textContent).toContain('Selected: Yes');
    expect(screen.getByTestId('daycard-3').textContent).toContain('Selected: No');
  });

  test('calls setIndexFunction with correct day when a DayCard is clicked', () => {
    render(<WeekdayBar weather={weatherData} setIndexFunction={mockSetIndex} selectedIndex={0} />);
    fireEvent.click(screen.getByTestId('daycard-5'));
    expect(mockSetIndex).toHaveBeenCalledWith(5);
  });
});
