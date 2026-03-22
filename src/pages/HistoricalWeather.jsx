import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Navbar from "../Componants/Navbar";
import { useLocation } from "../hooks/useLocation";
import { getHistoricalWeather } from "../services/weatherApi";
import Loader from "../Componants/Loader";

const HistoricalWeather = () => {
  const { coords, error: locationError } = useLocation();
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    if (!coords) return;

    setLoading(true);
    setError(null);

    const start = startDate.toISOString().slice(0, 10);
    const end = endDate.toISOString().slice(0, 10);

    try {
      const result = await getHistoricalWeather(coords.lat, coords.lon, start, end);
      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load historical data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coords) fetchHistory();
  }, [coords]);

  if (locationError) {
    return (
      <div className="container">
        <Navbar />
        <p className="error">Location error: {locationError}</p>
      </div>
    );
  }

  const toIST = (iso) =>
    new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(iso));

  const computeSummary = () => {
    if (!data?.daily) return null;

    const tempMaxArr = data.daily.temperature_2m_max || [];
    const tempMinArr = data.daily.temperature_2m_min || [];
    const precipArr = data.daily.precipitation_sum || [];
    const windMaxArr = data.daily.windspeed_10m_max || [];
    const windDirArr = data.daily.winddirection_10m_dominant || [];

    const maxTemp = tempMaxArr.length > 0 ? Math.max(...tempMaxArr) : null;
    const minTemp = tempMinArr.length > 0 ? Math.min(...tempMinArr) : null;

    const meanTemp =
      tempMaxArr.length > 0 && tempMinArr.length > 0
        ? (tempMaxArr.reduce((a, b) => a + b, 0) + tempMinArr.reduce((a, b) => a + b, 0)) /
          (tempMaxArr.length * 2)
        : null;

    const totalPrecip = precipArr.length > 0 ? precipArr.reduce((a, b) => a + b, 0) : null;

    const maxWind = windMaxArr.length > 0 ? Math.max(...windMaxArr) : null;

    let dominantWind = "N/A";
    if (windDirArr.length > 0) {
      const directionCounts = windDirArr.reduce((acc, dir) => {
        const roundDir = Math.round(dir / 10) * 10;
        acc[roundDir] = (acc[roundDir] || 0) + 1;
        return acc;
      }, {});
      dominantWind = Object.keys(directionCounts).reduce((a, b) =>
        directionCounts[a] > directionCounts[b] ? a : b
      );
      dominantWind = dominantWind ? `${dominantWind}°` : "N/A";
    }

    const pm10 = data.hourly?.pm10 || [];
    const pm2_5 = data.hourly?.pm2_5 || [];

    return {
      meanTemp,
      maxTemp,
      minTemp,
      totalPrecip,
      maxWind,
      dominantWind,
      sunrise: data.daily.sunrise?.[0] ? toIST(data.daily.sunrise[0]) : "N/A",
      sunset: data.daily.sunset?.[0] ? toIST(data.daily.sunset[0]) : "N/A",
      pm10Min: pm10.length > 0 ? Math.min(...pm10) : null,
      pm10Max: pm10.length > 0 ? Math.max(...pm10) : null,
      pm25Min: pm2_5.length > 0 ? Math.min(...pm2_5) : null,
      pm25Max: pm2_5.length > 0 ? Math.max(...pm2_5) : null,
    };
  };

  const summary = computeSummary();

  return (
    <div className="container">
      <Navbar />

      <div className="controls">
        <label>
          Start date
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </label>
        <label>
          End date
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </label>
        <button onClick={fetchHistory}>Refresh historical data</button>
      </div>

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="grid">
          <div className="card">
            <h3>Temp Mean</h3>
            <p className="weather-value">{summary.meanTemp != null ? summary.meanTemp.toFixed(1) + "°C" : "N/A"}</p>
          </div>
          <div className="card">
            <h3>Temp Max</h3>
            <p className="weather-value">{summary.maxTemp != null ? summary.maxTemp.toFixed(1) + "°C" : "N/A"}</p>
          </div>
          <div className="card">
            <h3>Temp Min</h3>
            <p className="weather-value">{summary.minTemp != null ? summary.minTemp.toFixed(1) + "°C" : "N/A"}</p>
          </div>
          <div className="card">
            <h3>Sunrise (IST)</h3>
            <p className="weather-value">{summary.sunrise}</p>
          </div>
          <div className="card">
            <h3>Sunset (IST)</h3>
            <p className="weather-value">{summary.sunset}</p>
          </div>
          <div className="card">
            <h3>Precipitation Total</h3>
            <p className="weather-value">{summary.totalPrecip != null ? summary.totalPrecip.toFixed(1) + " mm" : "N/A"}</p>
          </div>
          <div className="card">
            <h3>Max Wind</h3>
            <p className="weather-value">{summary.maxWind != null ? summary.maxWind.toFixed(1) + " km/h" : "N/A"}</p>
          </div>
          <div className="card">
            <h3>Dominant Wind Dir</h3>
            <p className="weather-value">{summary.dominantWind}</p>
          </div>
          <div className="card">
            <h3>PM10 Range</h3>
            <p className="weather-value">
              {summary.pm10Min != null ? summary.pm10Min.toFixed(1) : "N/A"} - {summary.pm10Max != null ? summary.pm10Max.toFixed(1) : "N/A"}
            </p>
          </div>
          <div className="card">
            <h3>PM2.5 Range</h3>
            <p className="weather-value">
              {summary.pm25Min != null ? summary.pm25Min.toFixed(1) : "N/A"} - {summary.pm25Max != null ? summary.pm25Max.toFixed(1) : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalWeather;
