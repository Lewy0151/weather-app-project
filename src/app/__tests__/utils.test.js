
import {
  getWeekday,
  formatDate,
  getWeatherName,
  getWeatherIcon,
  getWindDirection
} from '../utils';

describe('Utility functions', () => {
  test('getWeekday returns correct weekday abbreviation', () => {
    expect(getWeekday('2024-06-12')).toBe('Wed');
    expect(getWeekday('2024-06-13')).toBe('Thu');
  });

  test('formatDate formats the date as day/month', () => {
    expect(formatDate('2024-06-12')).toBe('12/6');
    expect(formatDate('2024-12-01')).toBe('1/12');
  });

  test('getWeatherName returns correct weather name', () => {
    expect(getWeatherName(0)).toBe('Clear sky');
    expect(getWeatherName(1)).toBe('Mainly clear');
    expect(getWeatherName(999)).toBe('Unknown');
  });

  test('getWeatherIcon returns correct icon path', () => {
    expect(getWeatherIcon(0)).toBe('/icons/clear-day.png');
    expect(getWeatherIcon(0, true)).toBe('/icons/clear-night.png');
    expect(getWeatherIcon(999)).toBe('/icons/unknown.png');
  });

  test('getWindDirection returns correct compass direction', () => {
    expect(getWindDirection(0)).toBe('N');
    expect(getWindDirection(45)).toBe('NE');
    expect(getWindDirection(90)).toBe('E');
    expect(getWindDirection(225)).toBe('SW');
    expect(getWindDirection(360)).toBe('N');
  });
});
