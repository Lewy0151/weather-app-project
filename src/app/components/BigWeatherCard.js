export default function BigWeatherCard({ dayData }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-left">
          <h2 className="text-2xl font-semibold">{dayData.day}</h2>
          <div className="h-[2px] bg-gray-300 mt-1 w-130"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-start">
        {/* Left Side  */}
        <div className="flex flex-col items-center space-y-4"> 
          <div className="flex items-center space-x-4">
            <img
              src={`/icons/${dayData.icon}.png`}
              alt={dayData.summary}
              className="h-20 w-20"
            />
            <p className="text-4xl font-bold">{dayData.temp}°C</p>
          </div>
        
          <p className="text-lg text-gray-600">{dayData.summary}</p>
        </div>

        {/* Right Side */}
        <div className=" space-y-7 text-m text-gray-700">
          <div><span className="font-medium">Max:</span> {dayData.max}°C</div>
          <div><span className="font-medium">Min:</span> {dayData.min}°C</div>
          <div><span className="font-medium">Wind:</span> {dayData.wind} km/h</div>
        </div>
      </div>
    </div>
  );
}
