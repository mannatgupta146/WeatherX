import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('New Delhi');

  const handleSearch = () => {
    if (city.trim() !== '') {
      setSearchCity(city);
      setCity('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">
        WeatherX
        <span className="text-xl align-top ml-2">⛅</span>
      </h1>
      
      <div className="flex flex-col md:flex-row gap-3 mb-6 w-full max-w-md">
        <input
          type="text"
          className="flex-1 px-5 py-2.5 rounded-full border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-md transition-all duration-300 placeholder-gray-400 text-gray-700"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 hover:text-blue-700 transition duration-300 shadow-md transform hover:scale-105 active:scale-95"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="w-full max-w-lg">
        <WeatherCard city={searchCity} />
      </div>
    </div>
  );
}

export default App;
