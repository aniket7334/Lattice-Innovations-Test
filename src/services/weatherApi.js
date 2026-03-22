export const getCurrentWeather = async (lat, lon) => {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.append("latitude", lat);
  url.searchParams.append("longitude", lon);
  url.searchParams.append("current_weather", "true");
  url.searchParams.append(
    "hourly",
    "temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,pm10,pm2_5"
  );
  url.searchParams.append(
    "daily",
    "temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset,precipitation_probability_max,windspeed_10m_max"
  );
  url.searchParams.append("timezone", "auto");

  const res = await fetch(url.toString());

  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
};

export const getHistoricalWeather = async (lat, lon, startDate, endDate) => {
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.append("latitude", lat);
  url.searchParams.append("longitude", lon);
  url.searchParams.append(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset"
  );
  url.searchParams.append("hourly", "pm10,pm2_5,winddirection_10m,windspeed_10m");
  url.searchParams.append("start_date", startDate);
  url.searchParams.append("end_date", endDate);
  url.searchParams.append("timezone", "auto");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch historical weather");
  return res.json();
};