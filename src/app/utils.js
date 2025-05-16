
export function getWeekday(dateString) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dateString).getDay()];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

export function getWeatherName(code) {
  const weatherMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    61: "Light rain",
    71: "Slight snow fall",
    95: "Thunderstorm",
  };
  return weatherMap[code] || "Unknown";
}

export function getWeatherIcon(code, isNight = false) {
  const icons = {
    0: isNight ? "/icons/clear-night.png" : "/icons/clear-day.png",
    1: "/icons/mainly-clear.png",
    2: "/icons/partly-cloudy.png",
    3: "/icons/overcast.png",
    61: "/icons/rain.png",
    95: "/icons/thunderstorm.png",
  };
  return icons[code] || "/icons/unknown.png";
}

export function getWindDirection(degree) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
}
