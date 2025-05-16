"use client";

export default function DayCard({ day, weather, setIndexFunction, selectedIndex }) {
    if (!weather) return null;
    let date = new Date();
    date.setDate(date.getDate() + day);

    return (
        <div className="w-full h-full overflow-visible">
            <div className={`w-full h-full text-center text-nowrap flex flex-col items-center bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 ${(selectedIndex == day) ? 'border-2' : ''}`} onClick={() => setIndexFunction(day)}>
                <img src={weather.iconURL} alt={weather.summary} title={weather.summary} className="w-80px h-60px h-full align-middle"/>
                <p className="text-3xl font-bold">{weather.day}</p>
                {(weather && weather.temp != null) ? weather.temp + "°C" : "N/A"}
            </div>
        </div>
    );
}