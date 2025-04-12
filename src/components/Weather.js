
// // Weather.js
// import React, { useState, useEffect } from 'react';
// import icon from '../assets/weathericons/thunderstorm.svg';
// import WeatherChart from './WeatherChart';
// import { WiHumidity } from "react-icons/wi";
// import { TiWeatherCloudy } from "react-icons/ti";
// import { FiWind } from "react-icons/fi";
// import { CiCalendarDate } from "react-icons/ci";
// import { MdOutlineElectricBolt } from "react-icons/md";

// const Weather = () => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [totalLoad, setTotalLoad] = useState(0);

//     // Get current date in DD-MM-YYYY format
//     const getCurrentDate = () => {
//         const today = new Date();
//         const day = String(today.getDate()).padStart(2, '0');
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const year = today.getFullYear();
//         return `${day}-${month}-${year}`;
//     };

//     // Fetch weather data for today
//     useEffect(() => {
//         const fetchWeatherData = async () => {
//             try {
//                 const currentDate = getCurrentDate();
//                 const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${currentDate}`);

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();

//                 if (data && data.length > 0) {
//                     setWeatherData(data);
//                     setCurrentWeather(data[0]); // Use first entry for current weather

//                     // Calculate total load for the day
//                     const sum = data.reduce((total, entry) => total + (entry.Load || 0), 0);
//                     setTotalLoad(sum);
//                 }

//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWeatherData();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-[#0F1926] text-lg">Loading weather data...</div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-[#BF7C41] text-lg">Error: {error}</div>
//             </div>
//         );
//     }

//     if (!weatherData || weatherData.length === 0) {
//         return (
//             <div className="flex items-center justify-center h-64 bg-[#F2EFDF] rounded-md"
//                 style={{ border: '2px dashed #AABFB9' }}>
//                 <div className="text-[#0F1926] text-xl font-bold">No weather data available</div>
//             </div>
//         );
//     }

//     return (
//         <div className='sm:p-4'>
//             <div className="Header my-[20px]">
//                 <div className="heading text-center text-[32px] font-bold text-[#0F1926]"> Today's Weather Overview</div>
//             </div>
//             <div className="z-0 w-full content_box p-2 bg-[#0F1926] rounded-md grid gap-4 grid-cols-10 items-center ">
//                 <div className='col-span-3 flex justify-center items-center'>
//                     <div className="py-2 px-6 bg-[#AABFB9] bg-opacity-20 backdrop-blur rounded-md " style={{ boxShadow: '0px 0px 10px 1px rgba(242, 239, 223, 0.75)' }}>
//                         <div className="flex gap-2 items-center ">
//                             <div className="icon">
//                                 <img className="w-20" src={icon} alt="" />
//                             </div>
//                             <div className=" font-bold text-[60px] text-[#F2EFDF]">{currentWeather.Temperature}°C</div>
//                         </div>
//                         <div className="info flex flex-col gap-2  text-[#F2EFDF]">
//                             <div className="weekday flex gap-2 items-center">
//                                 <CiCalendarDate className='text-[28px] text-[#BF7C41]' />
//                                 Weekday : {currentWeather.Weekday}
//                             </div>
//                             <div className="humidity flex gap-2 items-center">
//                                 <WiHumidity className='text-[28px] text-[#BF7C41]' />
//                                 Humidity : {currentWeather.Humidity}%
//                             </div>
//                             <div className="weather flex gap-2 items-center">
//                                 <TiWeatherCloudy className='text-[28px] text-[#BF7C41]' />
//                                 Weather : {currentWeather.Condition}
//                             </div>
//                             <div className="windspeed flex gap-2 items-center">
//                                 <FiWind className='text-[28px] text-[#BF7C41]' />
//                                 Wind Speed : {currentWeather.Wind_Speed} km/h
//                             </div>
//                             <div className="totalload flex gap-2 items-center">
//                                 <MdOutlineElectricBolt className='text-[28px] text-[#BF7C41]' />
//                                 Total Load : {totalLoad.toFixed(2)} MW
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col-span-7'>
//                     <WeatherChart weatherData={weatherData} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Weather;



// import React, { useState, useEffect } from 'react';
// import icon from '../assets/weathericons/thunderstorm.svg';
// import WeatherChart from './WeatherChart';
// import { WiHumidity } from "react-icons/wi";
// import { TiWeatherCloudy } from "react-icons/ti";
// import { FiWind } from "react-icons/fi";
// import { CiCalendarDate } from "react-icons/ci";
// import { MdOutlineElectricBolt } from "react-icons/md";

// const Weather = () => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [totalLoad, setTotalLoad] = useState(0);

//     // Get current IST time and date
//     const getCurrentIST = () => {
//         const now = new Date();
//         // Add 5 hours 30 minutes for IST offset
//         const ISTOffset = 330 * 60 * 1000; // IST is UTC+5:30
//         const ISTTime = now.getTime() + ISTOffset;
//         return new Date(ISTTime);
//     };

//     // Format total load for display
//     const formatTotalLoad = (value) => {
//         if (value >= 1000000) {
//             return `${(value / 1000000).toFixed(2)}M MW`; // Millions
//         } else if (value >= 1000) {
//             return `${(value / 1000).toFixed(1)}k MW`; // Thousands
//         }
//         return `${value.toFixed(2)} MW`; // Less than 1000
//     };

//     // Find current hour data
//     const getCurrentHourData = (data) => {
//         const istDate = getCurrentIST();
//         const currentHour = istDate.getUTCHours().toString().padStart(2, '0');
//         const currentTimeSlot = `${currentHour}:00`;

//         return data.find(entry =>
//             entry.Time.startsWith(currentTimeSlot)
//         ) || data[0]; // Fallback to first entry if current hour not found
//     };

//     useEffect(() => {
//         const fetchWeatherData = async () => {
//             try {
//                 const istDate = getCurrentIST();
//                 const day = String(istDate.getUTCDate()).padStart(2, '0');
//                 const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
//                 const year = istDate.getUTCFullYear();
//                 const currentDate = `${day}-${month}-${year}`;

//                 const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${currentDate}`);
//                 if (!response.ok) throw new Error('Network response was not ok');

//                 const data = await response.json();

//                 if (data?.length > 0) {
//                     setWeatherData(data);
//                     setCurrentWeather(getCurrentHourData(data));
//                     setTotalLoad(data.reduce((sum, entry) => sum + (entry.Load || 0), 0));
//                 }
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWeatherData();
//     }, []);

//     // Loading and error states remain the same...

//     return (
//         <div className='sm:p-4'>
//             <div className="Header my-[20px]">
//                 <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Current Weather Overview</div>
//             </div>
//             <div className="z-0 w-full content_box p-2 bg-[#0F1926] rounded-md grid gap-4 grid-cols-10 items-center">
//                 <div className='col-span-3 flex justify-center items-center'>
//                     <div className="py-2 px-6 bg-[#AABFB9] bg-opacity-20 backdrop-blur rounded-md" style={{ boxShadow: '0px 0px 10px 1px rgba(242, 239, 223, 0.75)' }}>
//                         <div className="flex gap-2 items-center">
//                             <div className="icon">
//                                 <img className="w-20" src={icon} alt="Weather icon" />
//                             </div>
//                             <div className="font-bold text-[60px] text-[#F2EFDF]">
//                                 {currentWeather?.Temperature ?? '--'}°C
//                             </div>
//                         </div>
//                         <div className="info flex flex-col gap-2 text-[#F2EFDF]">
//                             <div className="flex gap-2 items-center">
//                                 <CiCalendarDate className='text-[28px] text-[#BF7C41]' />
//                                 <span>{currentWeather?.Weekday ?? '--'}</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <WiHumidity className='text-[28px] text-[#BF7C41]' />
//                                 <span>Humidity: {currentWeather?.Humidity ?? '--'}%</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <TiWeatherCloudy className='text-[28px] text-[#BF7C41]' />
//                                 <span>Condition: {currentWeather?.Condition ?? '--'}</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <FiWind className='text-[28px] text-[#BF7C41]' />
//                                 <span>Wind: {currentWeather?.Wind_Speed ?? '--'} km/h</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <MdOutlineElectricBolt className='text-[28px] text-[#BF7C41]' />
//                                 <span>Total Load: {formatTotalLoad(totalLoad)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col-span-7'>
//                     <WeatherChart weatherData={weatherData} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Weather;

// import React, { useState, useEffect } from 'react';
// import icon from '../assets/weathericons/thunderstorm.svg';
// import WeatherChart from './WeatherChart';
// import { WiHumidity } from "react-icons/wi";
// import { TiWeatherCloudy } from "react-icons/ti";
// import { FiWind } from "react-icons/fi";
// import { CiCalendarDate } from "react-icons/ci";
// import { MdOutlineElectricBolt } from "react-icons/md";

// const Weather = () => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [totalLoad, setTotalLoad] = useState(0);

//     // Get current IST time
//     const getCurrentIST = () => {
//         const now = new Date();
//         const ISTOffset = 330 * 60 * 1000; // IST is UTC+5:30
//         return new Date(now.getTime() + ISTOffset);
//     };

//     // Format load value for display
//     const formatTotalLoad = (value) => {
//         if (value >= 1000000) {
//             return `${(value / 1000000).toFixed(2)}M MW`; // Millions
//         } else if (value >= 1000) {
//             return `${(value / 1000).toFixed(1)}k MW`; // Thousands
//         }
//         return `${value.toFixed(2)} MW`; // Less than 1000
//     };

//     // Find current hour data
//     const getCurrentHourData = (data) => {
//         const istDate = getCurrentIST();
//         const currentHour = istDate.getUTCHours().toString().padStart(2, '0');

//         return data.find(entry => {
//             const entryHour = entry.Time.split('-')[0];
//             return entryHour === currentHour;
//         }) || data[0];
//     };

//     useEffect(() => {
//         const fetchWeatherData = async () => {
//             try {
//                 const istDate = getCurrentIST();
//                 const day = String(istDate.getUTCDate()).padStart(2, '0');
//                 const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
//                 const year = istDate.getUTCFullYear();
//                 const currentDate = `${day}-${month}-${year}`;

//                 const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${currentDate}`);
//                 if (!response.ok) throw new Error('Network response was not ok');

//                 const data = await response.json();

//                 if (data?.length > 0) {
//                     setWeatherData(data);
//                     setCurrentWeather(getCurrentHourData(data));
//                 }
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWeatherData();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className='sm:p-4'>
//             <div className="Header my-[20px]">
//                 <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Current Weather Overview</div>
//             </div>
//             <div className="z-0 w-full content_box p-2 bg-[#0F1926] rounded-md grid gap-4 grid-cols-10 items-center">
//                 <div className='col-span-3 flex justify-center items-center'>
//                     <div className="py-2 px-6 bg-[#AABFB9] bg-opacity-20 backdrop-blur rounded-md" style={{ boxShadow: '0px 0px 10px 1px rgba(242, 239, 223, 0.75)' }}>
//                         <div className="flex gap-2 items-center">
//                             <div className="icon">
//                                 <img className="w-20" src={icon} alt="Weather icon" />
//                             </div>
//                             <div className="font-bold text-[60px] text-[#F2EFDF]">
//                                 {currentWeather?.Temperature ?? '--'}°C
//                             </div>
//                         </div>
//                         <div className="info flex flex-col gap-2 text-[#F2EFDF]">
//                             <div className="flex gap-2 items-center">
//                                 <CiCalendarDate className='text-[28px] text-[#BF7C41]' />
//                                 <span>{currentWeather?.Weekday ?? '--'}</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <WiHumidity className='text-[28px] text-[#BF7C41]' />
//                                 <span>Humidity: {currentWeather?.Humidity ?? '--'}%</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <TiWeatherCloudy className='text-[28px] text-[#BF7C41]' />
//                                 <span>Condition: {currentWeather?.Condition ?? '--'}</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <FiWind className='text-[28px] text-[#BF7C41]' />
//                                 <span>Wind: {currentWeather?.Wind_Speed ?? '--'} km/h</span>
//                             </div>
//                             <div className="flex gap-2 items-center">
//                                 <MdOutlineElectricBolt className='text-[28px] text-[#BF7C41]' />
//                                 <span>Total Load: {formatTotalLoad(totalLoad)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col-span-7'>
//                     <WeatherChart weatherData={weatherData} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Weather;

import React, { useState, useEffect } from 'react';
import icon from '../assets/weathericons/thunderstorm.svg';
import WeatherChart from './WeatherChart';
import { WiHumidity } from "react-icons/wi";
import { TiWeatherCloudy } from "react-icons/ti";
import { FiWind } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineElectricBolt } from "react-icons/md";

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalLoad, setTotalLoad] = useState(0);

    // Get current IST time
    const getCurrentIST = () => {
        const now = new Date();
        const ISTOffset = 330 * 60 * 1000; // IST is UTC+5:30
        return new Date(now.getTime() + ISTOffset);
    };

    // Format load value for display
    const formatTotalLoad = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(2)}M MW`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k MW`;
        }
        return `${value.toFixed(2)} MW`;
    };

    // Find current hour data
    const getCurrentHourData = (data) => {
        const istDate = getCurrentIST();
        const currentHour = istDate.getUTCHours().toString().padStart(2, '0');

        return data.find(entry => {
            const entryHour = entry.Time.split('-')[0];
            return entryHour === currentHour;
        }) || data[0];
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const istDate = getCurrentIST();
                const day = String(istDate.getUTCDate()).padStart(2, '0');
                const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
                const year = istDate.getUTCFullYear();
                const currentDate = `${day}-${month}-${year}`;

                const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${currentDate}`);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                if (data?.length > 0) {
                    setWeatherData(data);
                    setCurrentWeather(getCurrentHourData(data));
                    // Calculate total daily load
                    setTotalLoad(data.reduce((sum, entry) => sum + (entry.Load || 0), 0));
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='sm:p-4'>
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Current Weather Overview</div>
            </div>
            <div className="z-0 w-full content_box p-2 bg-[#0F1926] rounded-md grid gap-4 grid-cols-10 items-center">
                <div className='col-span-3 flex justify-center items-center'>
                    <div className="py-2 px-6 bg-[#AABFB9] bg-opacity-20 backdrop-blur rounded-md" style={{ boxShadow: '0px 0px 10px 1px rgba(242, 239, 223, 0.75)' }}>
                        <div className="flex gap-2 items-center">
                            <div className="icon">
                                <img className="w-20" src={icon} alt="Weather icon" />
                            </div>
                            <div className="font-bold text-[60px] text-[#F2EFDF]">
                                {currentWeather?.Temperature ?? '--'}°C
                            </div>
                        </div>
                        <div className="info flex flex-col gap-2 text-[#F2EFDF]">
                            <div className="flex gap-2 items-center">
                                <CiCalendarDate className='text-[28px] text-[#BF7C41]' />
                                <span>{currentWeather?.Weekday ?? '--'}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <WiHumidity className='text-[28px] text-[#BF7C41]' />
                                <span>Humidity: {currentWeather?.Humidity ?? '--'}%</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <TiWeatherCloudy className='text-[28px] text-[#BF7C41]' />
                                <span>Condition: {currentWeather?.Condition ?? '--'}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FiWind className='text-[28px] text-[#BF7C41]' />
                                <span>Wind: {currentWeather?.Wind_Speed ?? '--'} km/h</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <MdOutlineElectricBolt className='text-[28px] text-[#BF7C41]' />
                                <span>Total Load: {formatTotalLoad(totalLoad)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-7'>
                    <WeatherChart weatherData={weatherData} />
                </div>
            </div>
        </div>
    );
};

export default Weather;