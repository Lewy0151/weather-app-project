'use client';
import { useState } from 'react';
import BigWeatherCard from './components/BigWeatherCard';
import SmallWeatherCard from './components/SmallWeatherCard';

const fakeForecast = [
  { day: 'Mon', icon: 'sunny', summary: 'Sunny', temp: 18, max: 20, min: 12, wind: 10 },
  { day: 'Tue', icon: 'cloudy', summary: 'Cloudy', temp: 16, max: 18, min: 11, wind: 12 },
  { day: 'Wed', icon: 'rain', summary: 'Rainy', temp: 14, max: 15, min: 10, wind: 18 },
  { day: 'Thu', icon: 'sunny', summary: 'Sunny', temp: 20, max: 22, min: 14, wind: 9 },
  { day: 'Fri', icon: 'thunder', summary: 'Stormy', temp: 13, max: 14, min: 9, wind: 25 },
  { day: 'Sat', icon: 'cloudy', summary: 'Overcast', temp: 15, max: 17, min: 11, wind: 10 },
  { day: 'Sun', icon: 'snow', summary: 'Snowy', temp: 0, max: 2, min: -3, wind: 5 },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedDay = fakeForecast[selectedIndex];

  // Arrow Handler
  const changeDay = (direction) => {
    let newIndex = selectedIndex + direction;
    if (newIndex < 0) newIndex = fakeForecast.length - 1; 
    if (newIndex >= fakeForecast.length) newIndex = 0; 
    setSelectedIndex(newIndex);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Arrows */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => changeDay(-1)}
            className="text-6xl cursor-pointer w-[100px] transition-transform duration-300 ease-in-out transform hover:scale-125"
          >
            &#8592; {/* Left arrow */}
          </button>

          {/* Big Weather Card */}
          <div className="w-[600px]"> {}
            <BigWeatherCard dayData={selectedDay} />
          </div>

          <button
            onClick={() => changeDay(1)}
            className="text-6xl cursor-pointer w-[100px] transition-transform duration-300 ease-in-out transform hover:scale-125"
          >
            &#8594; {/* Right arrow */}
          </button>
        </div>

        {/* Small Weather Cards */}
        <div className="grid grid-cols-7 gap-4">
          {fakeForecast.map((day, index) => (
            <SmallWeatherCard
              key={index}
              dayData={day}
              isSelected={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
