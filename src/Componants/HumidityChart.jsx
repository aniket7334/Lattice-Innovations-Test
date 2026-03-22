import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HumidityChart = ({ weather }) => {
  if (!weather?.hourly?.time) return null;

  const data = weather.hourly.time.map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    humidity: weather.hourly.relativehumidity_2m[index],
  }));

  return (
    <div className="chart-container">
      <h3>Humidity (%)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" minTickGap={15} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="humidity" stroke="#38bdf8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityChart;
