import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TemperatureChart = ({ weather, unit }) => {
  if (!weather?.hourly?.time) return null;

  const data = weather.hourly.time.map((time, index) => {
    const celsius = weather.hourly.temperature_2m[index];
    const temperature = unit === "F" ? celsius * 9 / 5 + 32 : celsius;
    return {
      time: new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temperature: Number(temperature.toFixed(1)),
    };
  });

  return (
    <div className="chart-container">
      <h3>Temperature ({unit})</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" minTickGap={15} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#fed049" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
