import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BiWind } from 'react-icons/bi';
import { LuWaves } from 'react-icons/lu';
import { HiSun } from 'react-icons/hi';
import { PiCloudSunFill } from 'react-icons/pi';
import { BsSunrise, BsSunset } from 'react-icons/bs';

const WeatherCard = ({ city }) => {
    const API_KEY = "26871e3dc9493a0fbcee6f7f70eb7bc1";
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    };
    
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col"
                style={{ maxHeight: '90vh' }}>
                {/* City Header */}
                <div className="flex items-center gap-3 mb-4 border-b-2 border-blue-100 pb-4 justify-center flex-shrink-0">
                    <FaSearch className="text-blue-400 text-xl" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate max-w-[200px]">
                        {city}
                    </h2>
                </div>
    
                {loading ? (
                    /* Loading State */
                    <div className="animate-pulse flex flex-col items-center space-y-4 flex-grow justify-center">
                        <div className="h-8 bg-blue-100 rounded-full w-3/4"></div>
                        <div className="h-6 bg-blue-100 rounded-full w-1/2"></div>
                    </div>
                ) : weatherData && weatherData.main ? (
                    /* Weather Content */
                    <div className="flex flex-col flex-grow overflow-hidden">
                        {/* Main Weather Info */}
                        <div className="flex flex-col items-center pt-2 flex-shrink-0">
                            <HiSun className="text-5xl text-yellow-400 animate-pulse" />
                            <p className="text-4xl font-black text-gray-800 mt-2">
                                {Math.round(weatherData.main.temp)}°C
                            </p>
                            <p className="text-lg text-purple-600 font-semibold mt-2 flex items-center gap-2 truncate px-4">
                                <PiCloudSunFill className="text-orange-500 text-xl" />
                                {weatherData.weather[0].description}
                            </p>
                        </div>
    
                        {/* Scrollable Weather Grid */}
                        <div className="grid grid-cols-2 gap-3 text-gray-700 mt-4 pb-4 flex-grow overflow-y-auto px-2">
                            {/* Wind Card */}
                            <div className="bg-white/50 p-3 rounded-xl flex items-center gap-2">
                                <BiWind className="text-2xl text-blue-400" />
                                <div>
                                    <p className="text-xl font-semibold text-gray-500">Wind</p>
                                    <p className="text-lg font-bold">{weatherData.wind.speed} km/h</p>
                                </div>
                            </div>
                            
                            {/* Humidity Card */}
                            <div className="bg-white/50 p-3 rounded-xl flex items-center gap-2">
                                <LuWaves className="text-2xl text-blue-300" />
                                <div>
                                    <p className="text-xl font-semibold text-gray-500">Humidity</p>
                                    <p className="text-lg font-bold">{weatherData.main.humidity}%</p>
                                </div>
                            </div>
    
                            {/* Sunrise Card */}
                            <div className="bg-yellow-100/50 p-3 rounded-xl flex items-center gap-2">
                                <BsSunrise className="text-xl text-yellow-600" />
                                <div>
                                    <p className="text-xl font-semibold text-gray-500">Sunrise</p>
                                    <p className="font-mono font-bold text-lg">{formatTime(weatherData.sys.sunrise)}</p>
                                </div>
                            </div>
                            
                            {/* Sunset Card */}
                            <div className="bg-red-100/50 p-3 rounded-xl flex items-center gap-2">
                                <BsSunset className="text-xl text-red-600" />
                                <div>
                                    <p className="text-xl font-semibold text-gray-500">Sunset</p>
                                    <p className="font-mono font-bold text-lg">{formatTime(weatherData.sys.sunset)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Error State */
                    <div className="flex flex-col items-center text-red-500 mt-4 flex-grow justify-center">
                        <PiCloudSunFill className="text-3xl animate-bounce" />
                        <p className="text-lg font-semibold mt-2">City not found</p>
                    </div>
                )}
            </div>
        );
    };

export default WeatherCard;
