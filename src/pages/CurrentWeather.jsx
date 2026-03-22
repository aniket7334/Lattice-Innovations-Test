import { useEffect, useState } from "react";
import { useLocation } from "../hooks/useLocation";
import { getCurrentWeather } from "../services/weatherApi";
import Navbar from "../Componants/Navbar";
import TemperatureChart from "../Componants/TemperatureChart";
import HumidityChart from "../Componants/HumidityChart";
import WindChart from "../Componants/WindChart";
import AirQualityCard from "../Componants/AirQualityCard";
import HourlyCharts from "../Componants/HourlyCharts";
import Loader from "../Componants/Loader";
import DatePicker from "react-datepicker";

const CurrentWeather = () => {
  const { coords, error: locationError } = useLocation();
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(new Date());
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    if (!coords) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentWeather(coords.lat, coords.lon);
      setWeather(data);
    } catch (err) {
      setError(err.message ?? "Unable to load weather data.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) fetchWeather();
  }, [coords]);

  const convertTemp = (temp) => {
    if (unit === "F") return (temp * 9) / 5 + 32;
    return temp;
  };

  const formatTime = (datetime) => {
    const dateObj = new Date(datetime);
    return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (locationError) {
    return (
      <div className="container">
        <Navbar />
        <p className="error">Location error: {locationError}</p>
      </div>
    );
  }

  if (loading || !weather) return <Loader />;

  return (
    <div className="container">
      <Navbar />

      <div className="controls">
        <DatePicker selected={date} onChange={(dateItem) => setDate(dateItem)} />

        <button className={unit === "C" ? "active" : ""} onClick={() => setUnit("C")}>°C</button>
        <button className={unit === "F" ? "active" : ""} onClick={() => setUnit("F")}>°F</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        <div className="card">
          <h3>Current Temperature</h3>
          <p className="weather-value">
            {convertTemp(weather.current_weather.temperature).toFixed(1)}°{unit}
          </p>
        </div>

        <div className="card">
          <h3>Min Temperature</h3>
          <p className="weather-value">{weather.daily.temperature_2m_min[0].toFixed(1)}°C</p>
        </div>

        <div className="card">
          <h3>Max Temperature</h3>
          <p className="weather-value">{weather.daily.temperature_2m_max[0].toFixed(1)}°C</p>
        </div>

        <div className="card">
          <h3>Precipitation</h3>
          <p className="weather-value">{weather.hourly.precipitation[0] ?? 0} mm</p>
        </div>

        <div className="card">
          <h3>Relative Humidity</h3>
          <p className="weather-value">{weather.hourly.relativehumidity_2m[0]}%</p>
        </div>

        <div className="card">
          <h3>UV Index</h3>
          <p className="weather-value">{weather.daily.uv_index_max[0]}</p>
        </div>

        <div className="card">
          <h3>Sunrise</h3>
          <p className="weather-value">{formatTime(weather.daily.sunrise[0])}</p>
        </div>

        <div className="card">
          <h3>Sunset</h3>
          <p className="weather-value">{formatTime(weather.daily.sunset[0])}</p>
        </div>

        <div className="card">
          <h3>Max Wind Speed</h3>
          <p className="weather-value">{weather.daily.windspeed_10m_max[0]} km/h</p>
        </div>

        <div className="card">
          <h3>Precipitation Prob.</h3>
          <p className="weather-value">{weather.daily.precipitation_probability_max[0]}%</p>
        </div>

        <div className="card">
          <h3>Air Quality Index</h3>
          <p className="weather-value">N/A </p>
        </div>

        <div className="card">
          <h3>PM10</h3>
          <p className="weather-value">{weather.hourly.pm10[0]} µg/m³</p>
        </div>

        <div className="card">
          <h3>PM2.5</h3>
          <p className="weather-value">{weather.hourly.pm2_5[0]} µg/m³</p>
        </div>

        <div className="card">
          <h3>CO</h3>
          <p className="weather-value">N/A </p>
        </div>

        <div className="card">
          <h3>NO2</h3>
          <p className="weather-value">N/A </p>
        </div>

        <div className="card">
          <h3>SO2</h3>
          <p className="weather-value">N/A </p>
        </div>
      </div>

      <HourlyCharts weather={weather} unit={unit} />

      <div className="chart-row">
        <AirQualityCard weather={weather} />
      </div>
    </div>
  );
};

export default CurrentWeather;
