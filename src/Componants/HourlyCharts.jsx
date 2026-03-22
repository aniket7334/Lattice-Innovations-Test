import TemperatureChart from "./TemperatureChart";
import HumidityChart from "./HumidityChart";
import WindChart from "./WindChart";
import AirQualityCard from "./AirQualityCard";

const HourlyCharts = ({ weather, unit }) => {
  if (!weather) return null;

  return (
    <div className="charts-scroll" role="region" aria-label="Hourly weather charts">
      <TemperatureChart weather={weather} unit={unit} />
      <HumidityChart weather={weather} />
      <WindChart weather={weather} />
      <AirQualityCard weather={weather} />
    </div>
  );
};

export default HourlyCharts;
