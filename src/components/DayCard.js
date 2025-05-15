"use client";

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
    return "Weather undefined";
}

export default function DayCard({ day, weather, setIndexFunction }) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    let dayName = date.toLocaleDateString("en-GB", { weekday: "short" });

    return (
        <div className="bg-white shadow-md text-black text-center w-full p-2 border-1 border-zinc-300 flex flex-col items-center" onClick={() => setIndexFunction(day)}>
            <img src={getWeatherIcon((weather ? weather.weather_code[day] : -1), (date.getHours() < 6 || date.getHours() > 20))} alt={getWeatherName((weather ? weather.weather_code[day] : -1))} title={getWeatherName((weather ? weather.weather_code[day] : -1))}/>
            <p className="text-3xl font-bold">{dayName}</p>
            L: {weather ? weather.temperature_2m_min[day] : "..."} | H: {weather ? weather.temperature_2m_max[day] : "..."}
        </div>
    );
}