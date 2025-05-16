

function formatTime(time) {
  const date = new Date(time);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function BigWeatherCard({ dayData }) {
  var displayTemp = (dayData.temp != null ? dayData.temp + "°C" : "N/A");
  var displayMax = (dayData.max != null ? dayData.min + "°C" : "N/A");
  var displayMin = (dayData.min != null ? dayData.min + "°C" : "N/A");
  var displayWind = (dayData.wind != null ? dayData.wind + " mph" : "N/A")
  var displayRain = (dayData.rain != null ? dayData.rain + " mm" : "N/A")
  const weatherSummary = `The sunrise will be at ${formatTime(dayData.sunrise)}, with the highest temperature of ${displayMax}. You can expect rainfall of ${displayRain} and winds of ${displayWind} coming from the ${dayData.windDir}. The sunset will be at ${formatTime(dayData.sunset)}.`;

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
              className="h-21 w-28"
            />
            <p className="text-4xl font-bold">{displayTemp}</p>
          </div>
          <p className="text-lg text-gray-600">{dayData.summary}</p>
        </div>

        {/* Right Side */}
        <div className="space-y-6 text-m text-gray-700">
          <div><span className="font-medium">Max:</span> {displayMax}</div>
          <div><span className="font-medium">Min:</span> {displayMin}</div>
          <div><span className="font-medium">Wind:</span> {displayWind}</div>
        </div>
      </div>

    
      <div className="h-[2px] bg-gray-300 my-4"></div>

      {/* Summary Text */}
      <p className="text-sm text-gray-700">{weatherSummary}</p>
    </div>
  );
}
