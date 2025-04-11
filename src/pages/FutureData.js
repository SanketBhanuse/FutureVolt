import React, { useState, useEffect } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import Graph from '../components/Graph';
import Grid from '../components/Grid';

const FutureData = () => {
    const [selectedOption, setSelectedOption] = useState('electricity');
    const [showGraph, setShowGraph] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [forecastData, setForecastData] = useState([]);

    // Generate demo forecast data matching your API structure
    const generateDemoData = (date) => {
        const data = [];
        const weekday = new Date(date.split('-').reverse().join('-')).toLocaleString('en-us', { weekday: 'long' });
        const isHoliday = false; // You can modify this if needed
        const event = ''; // You can add events if needed

        for (let hour = 0; hour < 24; hour++) {
            const timeSlot = `${hour.toString().padStart(2, '0')}:00-${(hour + 1).toString().padStart(2, '0')}:00`;

            // Base values with some variation
            const baseTemp = 15 + Math.sin(hour / 4) * 10;
            const baseHumidity = 60 + Math.sin(hour / 3) * 20;
            const baseWind = 2 + Math.random() * 5;
            const baseLoad = 1000 + Math.sin(hour / 2) * 800;

            data.push({
                _id: `demo_${date.replace(/-/g, '')}_${hour}`,
                Date: date,
                Time: timeSlot,
                Weekday: weekday,
                Temperature: parseFloat(baseTemp.toFixed(1)),
                Condition: getWeatherCondition(hour, baseTemp),
                Humidity: Math.round(baseHumidity),
                Wind_Speed: parseFloat(baseWind.toFixed(1)),
                Holiday: isHoliday,
                Event: event,
                Load: Math.round(baseLoad),
                Forecast_Load: Math.round(baseLoad + (Math.random() * 200 - 100))
            });
        }
        return data;
    };

    const getWeatherCondition = (hour, temp) => {
        if (hour < 6 || hour > 18) {
            return temp < 10 ? 'Fog' : 'Clear';
        }
        if (temp > 25) return 'Sunny';
        if (temp < 15) return 'Cloudy';
        return 'Partly Cloudy';
    };

    useEffect(() => {
        // Set default date to today when component mounts
        const today = new Date();
        const formattedToday = formatDateForDisplay(today);
        setSelectedDate(formatDateForInput(today));
        setForecastData(generateDemoData(formattedToday));
    }, []);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDateForDisplay = (date) => {
        if (date instanceof Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
        return date;
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);

        // Convert to display format and generate demo data
        const displayDate = formatDateForDisplay(new Date(date));
        setForecastData(generateDemoData(displayDate));
    };

    const setView = (e) => {
        const value = e.target.value;
        setShowGraph(value === "graph");
        setShowGrid(value === "grid");
    };

    const getMinDate = () => {
        return formatDateForInput(new Date());
    };

    const getMaxDate = () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return formatDateForInput(nextWeek);
    };

    const fetchForecastData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            console.log(`Would fetch forecast for ${selectedDate} from FastAPI`);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Actual API call would be:
            /*
            const response = await fetch(`http://your-fastapi-endpoint/forecast`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: selectedDate,
                    type: selectedOption
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch forecast data');
            }
            
            const data = await response.json();
            setForecastData(data);
            */

            // For demo, use generated data
            const displayDate = formatDateForDisplay(new Date(selectedDate));
            setForecastData(generateDemoData(displayDate));

        } catch (err) {
            console.error('Error fetching forecast data:', err);
            setError('Failed to load forecast data. Using demo data instead.');
            const displayDate = formatDateForDisplay(new Date(selectedDate));
            setForecastData(generateDemoData(displayDate));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            fetchForecastData();
        }
    }, [selectedDate, selectedOption]);

    return (
        <div className="container sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Forecast Data</div>
                <div className="subheading text-center text-[16px] text-gray-600">
                    View predictions for the next 7 days
                </div>
            </div>

            <div className="filters border rounded-md border-[#0F1926] p-4">
                <div className="title text-[18px] flex gap-2 items-center"> <IoFilterSharp /> Filters :</div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="weather-electricity" className="font-medium text-gray-700">Select Data:</label>
                        <select
                            id="weather-electricity"
                            className="p-2 border border-gray-300 rounded accent-[#0F1926]"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="weather">Weather</option>
                            <option value="electricity">Electricity</option>
                        </select>
                    </div>

                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="date" className="font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            id="date"
                            className="p-2 border border-gray-300 rounded"
                            onChange={handleDateChange}
                            value={selectedDate || ''}
                            min={getMinDate()}
                            max={getMaxDate()}
                        />
                    </div>

                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="view-type" className="font-medium text-gray-700">Select View:</label>
                        <select
                            id="view-type"
                            className="p-2 border border-gray-300 rounded"
                            onChange={setView}
                            value={showGraph ? "graph" : "grid"}
                        >
                            <option value="graph">Graph</option>
                            <option value="grid">Grid</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Status messages */}
            {isLoading && (
                <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded">
                    Loading forecast data...
                </div>
            )}
            {error && (
                <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
                    {error}
                </div>
            )}

            {/* Data Visualization Section */}
            <div className="mt-6">
                {showGraph && forecastData.length > 0 && (
                    <Graph
                        bar={true}
                        date={formatDateForDisplay(new Date(selectedDate))}
                        selectedOption={selectedOption}
                        isForecast={true}
                        forecastData={forecastData}
                    />
                )}
                {showGrid && forecastData.length > 0 && (
                    <Grid
                        date={formatDateForDisplay(new Date(selectedDate))}
                        isForecast={true}
                        forecastData={forecastData}
                    />
                )}
            </div>
        </div>
    );
};

export default FutureData;