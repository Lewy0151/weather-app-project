'use client';
import { useState, useEffect } from 'react';
import BigWeatherCard from './components/BigWeatherCard';
import SmallWeatherCard from './components/SmallWeatherCard';
import ApiClient from '../../ApiClient/client';


const cities = {
  Liverpool: { latitude: 53.4106, longitude: -2.9779 },
  London: { latitude: 51.5085, longitude: -0.1257 },
  Glasgow: { latitude: 55.8651, longitude: -4.2576 },
  Edinburgh: { latitude: 55.9521, longitude: -3.1965 },
  Belfast: { latitude: 54.5968, longitude: -5.9254 },
  Manchester: { latitude: 53.4809, longitude: -2.2374 },
  Plymouth: { latitude: 50.3715, longitude: -4.143 },
  Cardiff: { latitude: 51.48, longitude: -3.18 },
  Aberdeen: { latitude: 57.1437, longitude: -2.0981 },
  'Isle of Man': { latitude: 55.063, longitude: -3.5561 },
};


function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// Format date to DD-MM-YYYY
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Getting weekday
function getWeekday(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  if (inputDate.getTime() === today.getTime()) {
    return 'Today';
  }
  return inputDate.toLocaleDateString('en-GB', { weekday: 'short' });
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('London');
  const [forecast, setForecast] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const client = new ApiClient();

  // Fetching Weather Data
  const fetchWeather = async () => {
    if (!selectedCity || !cities[selectedCity]) return;
    setLoading(true);
    setError(null);
    try {
      const response = await client.getWeatherByCity(cities[selectedCity]);
      const data = response.data.daily;

      // Formating Forecast Data
      const formatted = data.time.map((date, index) => ({
        day: getWeekday(date),
        date: formatDate(date),
        icon: 'sunny', // Placeholder
        summary: 'Weather Info',
        temp: Math.round((data.temperature_2m_max[index] + data.temperature_2m_min[index]) / 2),
        max: data.temperature_2m_max[index],
        min: data.temperature_2m_min[index],
        rain: data.rain_sum[index],
        sunrise: data.sunrise[index],
        sunset: data.sunset[index],
        wind: (data.wind_speed_10m_max[index] * 0.621371).toFixed(1),
        windDir: getWindDirection(data.wind_direction_10m_dominant[index]),
        windDeg: data.wind_direction_10m_dominant[index],
      }));

      setForecast(formatted);
      setSelectedIndex(0);
    } catch (err) {
      setError(err.message || 'No weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  // Changing Selected Day
  const changeDay = (dir) => {
    setSelectedIndex((prev) => (prev + dir + forecast.length) % forecast.length);
  };

  const selectedDay = forecast[selectedIndex];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">UK Weather Forecast</h1>

        {/* City selection dropdown */}
        <div className="text-center mb-4">
          <label htmlFor="city" className="mr-2">Select City:</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 border rounded"
          >
            {Object.keys(cities).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Show error if something went wrong */}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!error && forecast.length > 0 && (
          <>




            {/* Arrows + Big Weather Card */}
            <div className="flex items-center justify-between mb-6 transition-opacity duration-300">
              <button
                onClick={() => changeDay(-1)}
                className="text-7xl cursor-pointer w-[80px] hover:scale-110 transition-transform"
              >
                &#8592;
              </button>

              <div className="w-[600px]">
                <BigWeatherCard dayData={selectedDay} />
              </div>

              <button
                onClick={() => changeDay(1)}
                className="text-7xl cursor-pointer w-[80px] hover:scale-110 transition-transform"
              >
                &#8594;
              </button>
            </div>

            {/* Small Cards */}
            <div className="grid grid-cols-7 gap-4 transition-opacity duration-300">
              {forecast.map((day, index) => (
                <SmallWeatherCard
                  key={index}
                  dayData={day}
                  isSelected={index === selectedIndex}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
