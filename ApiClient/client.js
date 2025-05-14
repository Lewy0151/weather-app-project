
import axios from "axios";
export default class ApiClient {
  async responseStatusCheck(responseObject) {
    if (responseObject.status >= 200 && responseObject.status < 300) {
      return responseObject;
    }
    throw new Error(responseObject.statusText);
  }
  async getWeatherByCity({ latitude, longitude }) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude,
      longitude,
      daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,wind_speed_10m_max,wind_direction_10m_dominant",
      timezone: "auto",
      models: "ukmo_seamless"
    };
    try {
      const response = await axios.get(url, { params });
      return this.responseStatusCheck(response);
    } catch (error) {
      throw new Error("No weather data found");
    }
  }
}