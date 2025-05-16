'use client';
import { useState, useEffect } from 'react';
import BigWeatherCard from './components/BigWeatherCard';
import WeekdayBar from './components/WeekdayBar';
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
  const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// Formatting Date To DD-MM-YYYY
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

function getWeatherIcon(code, night) {
    switch (code) {
        case 0:
            return (night ? "https://worldweather.wmo.int/images/24b.png" : "https://worldweather.wmo.int/images/24a.png");
        case 1:
            return (night ? "https://worldweather.wmo.int/images/22b.png" : "https://worldweather.wmo.int/images/22a.png");
        case 2:
            return (night ? "https://worldweather.wmo.int/images/21b.png" : "https://worldweather.wmo.int/images/21a.png");
        case 3:
            return (night ? "https://worldweather.wmo.int/images/23b.png" : "https://worldweather.wmo.int/images/23a.png");
        case 45:
        case 48:
            return "https://worldweather.wmo.int/images/16.png";
        case 51:
        case 53:
        case 55:
            return "https://worldweather.wmo.int/images/15.png";
        case 61:
        case 63:
        case 65:
            return "https://worldweather.wmo.int/images/14.png";
        case 56:
        case 57:
        case 66:
        case 67:
            return "https://worldweather.wmo.int/images/13.png"
        case 71:
            return "https://worldweather.wmo.int/images/7.png";
        case 73:
        case 75:
            return "https://worldweather.wmo.int/images/6.png";
        case 77:
            return "https://worldweather.wmo.int/images/5.png";
        case 80:
            return "https://worldweather.wmo.int/images/12.png";
        case 81:
        case 82:
            return "https://worldweather.wmo.int/images/9.png";
        case 85:
            return "https://worldweather.wmo.int/images/7.png";
        case 86:
            return "https://worldweather.wmo.int/images/6.png";
        case 95:
            return "https://worldweather.wmo.int/images/2.png";
        case 96:
        case 99:
            return "https://worldweather.wmo.int/images/3.png";
    }
    return null;
}

function getWeatherName(code) {
    switch (code) {
        case 0:
            return "Clear Sky";
        case 1:
            return "Lightly Cloudy";
        case 2:
            return "Partly Cloudy";
        case 3:
            return "Overcast";
        case 45:
            return "Fog";
        case 48:
            return "Rime Fog";
        case 51:
            return "Light Drizzle";
        case 53:
            return "Moderate Drizzle";
        case 55:
            return "Dense Drizzle";
        case 56:
            return "Light Freezing Drizzle";
        case 57:
            return "Dense Freezing Drizzle";
        case 61:
            return "Light Rain";
        case 63:
            return "Moderate Rain";
        case 65:
            return "Heavy Rain";
        case 66:
            return "Light Freezing Rain";
        case 67:
            return "Heavy Freezing Rain";
        case 71:
            return "Light Snowfall";
        case 73:
            return "Moderate Snowfall";
        case 75:
            return "Heavy Snowfall";
        case 77:
            return "Snow Grains";
        case 80:
            return "Light Showers";
        case 81:
            return "Moderate Showers";
        case 82:
            return "Heavy Showers";
        case 85:
            return "Light Snow Showers";
        case 86:
            return "Heavy Snow Showers";
        case 95:
            return "Thunderstorm";
        case 96:
            return "Thunderstorm with Slight Hail";
        case 99:
            return "Thunderstorm with Heavy Hail";
    }
    return "Weather Data";
}

function getBackgroundImage(code) {
    switch (code) {
        default:
        case 0:
            return "https://unsplash.com/photos/zjoydJb17mE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8c3Vubnl8ZW58MHx8fHwxNzQ3MzE2NzM0fDA&force=true&w=2400";
        case 1:
            return "https://unsplash.com/photos/ROVBDer29PQ/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8Y2xlYXIlMjBza3l8ZW58MHx8fHwxNzQ3MzE3NzkxfDI&force=true&w=2400";
        case 2:
            return "https://unsplash.com/photos/dbN5FK8ijZ4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNsZWFyJTIwc3VubnklMjBza3l8ZW58MHx8fHwxNzQ3MzE2NjEwfDA&force=true&w=2400";
        case 3:
            return "https://unsplash.com/photos/4C6Rp23RjnE/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8b3ZlcmNhc3R8ZW58MHx8fHwxNzQ3MzIwNzA2fDI&force=true&w=2400";
        case 45:
            return "https://unsplash.com/photos/KT3WlrL_bsg/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzQ3MzIwNzIwfA&force=true&w=2400";
        case 48:
            return "https://unsplash.com/photos/Pa7uT-Oy6zk/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cmltZSUyMGZvZ3xlbnwwfHx8fDE3NDczMjEwOTB8Mg&force=true&w=2400";
        case 51:
        case 53:
        case 55:
            return "https://unsplash.com/photos/aRparnlDUt0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGRyaXp6bGV8ZW58MHx8fHwxNzQ3MzIxMTE5fDI&force=true&w=2400";
        case 56:
        case 57:
            return "https://unsplash.com/photos/R1JvvBHh3v8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8ZnJlZXppbmclMjBkcml6emxlfGVufDB8fHx8MTc0NzMyMTE3Mnwy&force=true&w=2400";
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return "https://unsplash.com/photos/i2J9jnvaAbU/download?force=true&w=2400";
        case 66:
        case 67:
            return "https://unsplash.com/photos/rnxIOAJTamg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8Y29sZCUyMHJhaW58ZW58MHx8fHwxNzQ3MzIxMjc2fDI&force=true&w=2400";
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "https://unsplash.com/photos/atJncOD6ZFg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fHNub3dmYWxsfGVufDB8fHx8MTc0NzMyMTMzMHwy&force=true&w=2400";
        case 95:
        case 96:
        case 99:
            return "https://unsplash.com/photos/pbxwxwfI0B4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8c3Rvcm18ZW58MHx8fHwxNzQ3MzIxNjE0fDI&force=true&w=2400";
    }
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('London');
  const [forecast, setForecast] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState();

  const client = new ApiClient();

  // Fetching Weather Data
  const fetchWeather = async () => {
    if (!selectedCity || !cities[selectedCity]) return;
    setLoading(true);
    setError(null);
    try {
      const response = await client.getWeatherByCity(cities[selectedCity]);
      const data = response.data.daily;

      // Formatting Forecast Data
      const formatted = data.time.map((date, index) => ({
        day: getWeekday(date),
        date: formatDate(date),
        iconURL: getWeatherIcon(data.weather_code[index], (new Date().getHours() < 6 || new Date().getHours() > 20)), // Placeholder
        summary: getWeatherName(data.weather_code[index]),
        temp: Math.round((data.temperature_2m_max[index] + data.temperature_2m_min[index]) / 2),
        weatherCode: data.weather_code[index],
        max: data.temperature_2m_max[index],
        min: data.temperature_2m_min[index],
        rain: data.rain_sum[index] != null ? data.rain_sum[index] : 0,
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

  // We need to do this check before setting the background image otherwise it causes too many re-renders
  var newBackgroundImage = getBackgroundImage(forecast[selectedIndex] ? forecast[selectedIndex].weatherCode : 0)
  if (backgroundImage != newBackgroundImage) {
    setBackgroundImage(newBackgroundImage);
  }

  return (
    <main className={`min-h-screen transition-all duration-200 ease-in-out bg-cover`} style={{backgroundImage: `url(${backgroundImage})`}}>
      
      {/* Header with logo and name */}
      <div className="w-full bg-white shadow-md border-2 border-white py-4 mb-10">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW0wbTY2d3dvNTZmbHE3Y20zd3Jya2F4am8wNWZnc3VyajJrOHVldCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YfjA34yJQTMSaJ86ki/giphy.gif"
            alt="Wellies Gif"
            className="w-12 h-12 mr-3"
          />
          <h1 className="text-3xl font-bold text-gray-800">Wellie Watcher</h1>
        </div>
      </div>

      {/* City selection dropdown */}
      <div className="mb-2 border-2 border-white p-3 bg-white rounded-lg shadow-md w-fit mx-auto text-center">
        <label htmlFor="city" className="mr-2">Select City:</label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded"
        >
          {Object.keys(cities).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Showing Error If Issue */}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!error && forecast.length > 0 && (
        <>
          {/* Arrows + Big Weather Card */}
          <div className="max-w-4xl mx-auto">
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
          </div>

          {/* Small Cards */}
          <div className="max-w-4xl mx-auto">
            <div className="transition-opacity duration-300">
                <WeekdayBar weather={forecast} setIndexFunction={setSelectedIndex} selectedIndex={selectedIndex}/>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
