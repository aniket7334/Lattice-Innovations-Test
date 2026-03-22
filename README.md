# Weather Dashboard 🌦️

A responsive weather dashboard built with **ReactJS** that provides real-time and historical weather insights using the **Open-Meteo API**.
The application automatically detects the user's location using browser GPS and displays localized weather data.

---

## 🚀 Live Features

* Automatic **GPS Location Detection**
* **Current Weather Conditions**
* **Hourly Weather Forecast**
* **Air Quality Monitoring**
* **Historical Weather Data (up to 2 years)**
* Interactive **Weather Charts**
* **Temperature Toggle (°C / °F)**
* **Horizontal Chart Scrolling**
* **Mobile Responsive UI**

---

## 🛠 Tech Stack

* **ReactJS**
* **Axios**
* **Recharts (Charts & Data Visualization)**
* **React Datepicker**
* **Open-Meteo API**

---

## 🌐 APIs Used

### Weather Forecast API

Provides:

* Temperature
* Humidity
* Wind Speed
* Visibility
* Precipitation
* Sunrise & Sunset
* UV Index

### Air Quality API

Provides:

* PM10
* PM2.5
* Carbon Monoxide (CO)
* Nitrogen Dioxide (NO2)
* Sulphur Dioxide (SO2)

### Historical Weather API

Provides historical weather data up to **2 years**.

---

## 📊 Features

### Page 1: Current Weather & Hourly Forecast

Displays real-time weather data for the user's location.

#### Weather Variables

* Current Temperature
* Minimum Temperature
* Maximum Temperature
* Precipitation
* Relative Humidity
* UV Index
* Sunrise & Sunset
* Maximum Wind Speed
* Precipitation Probability

#### Air Quality Metrics

* Air Quality Index
* PM10
* PM2.5
* Carbon Monoxide
* Nitrogen Dioxide
* Sulphur Dioxide

#### Hourly Charts

* Temperature (with °C / °F toggle)
* Relative Humidity
* Precipitation
* Visibility
* Wind Speed
* PM10 & PM2.5 (combined chart)

---

### Page 2: Historical Weather Data

Allows users to select a **date range up to 2 years** to analyze weather trends.

#### Charts Included

* Temperature (Mean, Max, Min)
* Sunrise & Sunset
* Precipitation Total
* Maximum Wind Speed
* Dominant Wind Direction
* PM10 & PM2.5 Trends

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile Devices

Charts automatically adjust for smaller screens.

---

## ⚡ Performance

The application is optimized to render data quickly and efficiently using:

* Efficient API calls
* Lightweight chart rendering
* React component modularization

---

## 📂 Project Structure

```
src
│
├── components
│   ├── Navbar.js
│   ├── WeatherCards.js
│   ├── TemperatureChart.js
│   ├── HumidityChart.js
│   ├── WindChart.js
│   └── AirQualityChart.js
│
├── pages
│   ├── Dashboard.js
│   └── HistoricalWeather.js
│
├── services
│   └── weatherApi.js
│
├── styles
│   └── global.css
│
├── App.js
└── index.js


