import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import HistoricalWeather from "./pages/HistoricalWeather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/history" element={<HistoricalWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;