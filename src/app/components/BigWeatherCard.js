function formatTime(time) {
  const date = new Date(time);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function BigWeatherCard({ dayData }) {
  const weatherSummary = `Today the sunrise will be at ${formatTime(dayData.sunrise)}, with the highest temperature of ${dayData.max}°C. You can expect rainfall of ${dayData.rain} mm and winds of ${dayData.wind} mph coming from the ${dayData.windDir}. The sunset will be at ${formatTime(dayData.sunset)}.`;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">{dayData.day}</h2>
        <p className="text-xl font-semibold">{dayData.date}</p>
      </div>

     
      <div className="h-[2px] bg-gray-300 mb-4"></div>

      {/* Main Content */}
      <div className="flex justify-between items-start">
        {/* Left Side */}
        <div className="flex flex-col items-center space-y-4"> 
          <div className="flex items-center space-x-4">
            <img
              src={dayData.iconURL}
              alt={dayData.summary}
              className="h-20 w-20"
            />
            <p className="text-4xl font-bold">{dayData.temp}°C</p>
          </div>
          <p className="text-lg text-gray-600">{dayData.summary}</p>
        </div>

        {/* Right Side */}
        <div className="space-y-6 text-m text-gray-700">
          <div><span className="font-medium">Max:</span> {dayData.max}°C</div>
          <div><span className="font-medium">Min:</span> {dayData.min}°C</div>
          <div><span className="font-medium">Wind:</span> {dayData.wind} km/h</div>
        </div>
      </div>

    
      <div className="h-[2px] bg-gray-300 my-4"></div>

      {/* Summary Text */}
      <p className="text-sm text-gray-700">{weatherSummary}</p>
    </div>
  );
}
