import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AirQualityCard = ({ weather }) => {
  if (!weather?.hourly?.time || !weather.hourly.pm10) return null;

  const data = weather.hourly.time.map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    pm10: weather.hourly.pm10[index],
    pm25: weather.hourly.pm2_5[index],
  }));

  return (
    <div className="chart-container">
      <h3>Air Quality (µg/m³)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" minTickGap={15} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pm10" stroke="#f97316" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="pm25" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AirQualityCard;
