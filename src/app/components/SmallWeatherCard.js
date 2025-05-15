export default function SmallWeatherCard({ dayData, isSelected, onClick }) {
  return (
    <div className="w-full overflow-hidden">
      <div
        onClick={onClick}
        className={`w-full flex flex-col items-center bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${
          isSelected ? 'border-2' : ''
        }`}
      >
        <p className="text-sm font-medium">{dayData.day}</p>
        <img
          src={`/icons/${dayData.icon}.png`}
          alt={dayData.summary}
          className="h-10 w-10 my-2"
        />
        <p className="text-lg font-semibold">{dayData.temp}°C</p>
      </div>
    </div>
  );
}
