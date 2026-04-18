import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Search } from 'lucide-react';

const Weather: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Mumbai');

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    try {
      // Step 1: Get Lat/Long for the city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (geoData.results && geoData.results[0]) {
        const { latitude, longitude, name, country } = geoData.results[0];
        
        // Step 2: Get Weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`);
        const weatherData = await weatherRes.json();
        
        setData({
          city: name,
          country: country,
          current: weatherData.current,
          units: weatherData.current_units
        });
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Mumbai');
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-16 h-16 text-yellow-400" />;
    if (code <= 3) return <Cloud className="w-16 h-16 text-gray-400" />;
    return <CloudRain className="w-16 h-16 text-blue-400" />;
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#1a1c2c] to-[#4a1942] text-white p-8 font-sans overflow-y-auto">
      <div className="max-w-md mx-auto space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search city..." 
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-full py-3 pl-12 pr-6 outline-none transition-all focus:border-white/40"
            onKeyDown={(e: any) => e.key === 'Enter' && fetchWeather(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
            <p className="text-sm font-bold tracking-widest uppercase opacity-40">Syncing with Atmosphere...</p>
          </div>
        ) : data ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <h1 className="text-3xl font-bold tracking-tighter">{data.city}, {data.country}</h1>
              </div>
              <p className="text-sm uppercase tracking-[0.4em] opacity-40">Local Condition</p>
            </div>

            <div className="flex flex-col items-center gap-6 py-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              {getWeatherIcon(data.current.weather_code)}
              <div className="text-center">
                <div className="text-7xl font-bold tracking-tighter">{Math.round(data.current.temperature_2m)}°</div>
                <p className="text-sm font-bold uppercase opacity-40 mt-2">Feels like {Math.round(data.current.apparent_temperature)}°</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Wind className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs opacity-40 font-bold uppercase">Wind</div>
                  <div className="text-lg font-bold">{data.current.wind_speed_10m} km/h</div>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Thermometer className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xs opacity-40 font-bold uppercase">Humidity</div>
                  <div className="text-lg font-bold">{data.current.relative_humidity_2m}%</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="font-bold">Error: Location data not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
