"use client";

function getWeatherIcon(code) {
    return "";
}

function getWeatherName(code) {
    return "Weather undefined";
}

export default function DayCard({ day, weather }) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    let dayName = date.toLocaleDateString("en-GB", { weekday: "short" });

    return (
        <div className="bg-white shadow-md text-black text-center w-full p-2 border-1 border-zinc-300">
            <img src={getWeatherIcon(weather.weather_code[day])} alt={getWeatherName(weather.weather_code[day])} title={getWeatherName(weather.weather_code[day])}/>
            <p className="text-3xl font-bold">{dayName}</p>
            L: {weather ? weather.temperature_2m_min[day] : "..."} | H: {weather ? weather.temperature_2m_max[day] : "..."}
        </div>
    );
}