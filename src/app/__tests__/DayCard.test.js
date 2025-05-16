import { render, screen, fireEvent } from '@testing-library/react';
import DayCard from '../components/DayCard';

describe('DayCard', () => {
  const weather = {
    iconURL: '/icons/clear-day.png',
    summary: 'Clear sky',
    day: 'Mon',
    temp: 20,
  };

  const mockSetIndex = jest.fn();

  beforeEach(() => {
    mockSetIndex.mockClear();
  });

  test('renders weather info correctly', () => {
    render(<DayCard day={0} weather={weather} setIndexFunction={mockSetIndex} selectedIndex={1} />);
    
    expect(screen.getByAltText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });

  test('calls setIndexFunction on click', () => {
    render(<DayCard day={0} weather={weather} setIndexFunction={mockSetIndex} selectedIndex={1} />);
    fireEvent.click(screen.getByText('Mon'));
    expect(mockSetIndex).toHaveBeenCalledWith(0);
  });

  test('applies selected class if selectedIndex matches day', () => {    
    const { container } = render(<DayCard day={0} weather={weather} setIndexFunction={mockSetIndex} selectedIndex={0} />);
    expect(container.firstChild.firstChild).toHaveClass('border-2');
  });

  test('does not apply selected class if selectedIndex does not match day', () => {
    const { container } = render(<DayCard day={0} weather={weather} setIndexFunction={mockSetIndex} selectedIndex={1} />);
    
    expect(container.firstChild.firstChild).not.toHaveClass('border-2');
  });
});
