import axios from "axios";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const getWeatherInfo = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
  );
  return request.then((res) => res.data);
};

export default { getWeatherInfo };
