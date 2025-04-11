import React, { useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import Graph from '../components/Graph';
import Grid from '../components/Grid';

const Forecast = () => {
    const [selectedOption, setSelectedOption] = useState('electricity'); // Default to electricity
    const [showGraph, setShowGraph] = useState(true); // Show graph by default
    const [showGrid, setShowGrid] = useState(false);
    const [selectedDate, setSelectedDate] = useState(''); // Initially empty

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get date 7 days from now in YYYY-MM-DD format
    const getMaxDate = () => {
        const today = new Date();
        const future = new Date(today);
        future.setDate(future.getDate() + 7);
        const year = future.getFullYear();
        const month = String(future.getMonth() + 1).padStart(2, '0');
        const day = String(future.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (e) => {
        const date = new Date(e.target.value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        setSelectedDate(`${day}-${month}-${year}`);
    };

    const setView = (e) => {
        const value = e.target.value;
        if (value === "graph") {
            setShowGraph(true);
            setShowGrid(false);
        } else if (value === "grid") {
            setShowGrid(true);
            setShowGraph(false);
        }
    };

    // Demo forecast data - replace with actual FastAPI call
    const fetchForecastData = async (date) => {
        // This is where you'll connect to FastAPI later
        // const response = await fetch(`http://your-fastapi-url/forecast/${date}`);
        // return await response.json();

        // Demo data for now
        return Array.from({ length: 24 }, (_, i) => ({
            Time: `${String(i).padStart(2, '0')}:00-${String(i + 1).padStart(2, '0')}:00`,
            Date: date,
            Weekday: new Date(date.split('-').reverse().join('-')).toLocaleDateString('en-US', { weekday: 'long' }),
            Temperature: Math.round(20 + 10 * Math.sin(i / 4)), // Fluctuating temp
            Condition: i < 6 || i > 18 ? 'Clear' : i % 3 === 0 ? 'Partly Cloudy' : 'Sunny',
            Humidity: 60 + Math.round(20 * Math.sin(i / 3)), // Fluctuating humidity
            Wind_Speed: Math.round(5 + 5 * Math.sin(i / 2)), // Fluctuating wind
            Load: selectedOption === 'electricity' ? Math.round(1000 + 800 * Math.sin(i / 4)) : 0
        }));
    };

    return (
        <div className="container sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Forecast Data</div>
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
                            min={getTodayDate()}
                            max={getMaxDate()}
                            defaultValue={getTodayDate()}
                        />
                    </div>

                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="view-type" className="font-medium text-gray-700">Select View:</label>
                        <select
                            id="view-type"
                            className="p-2 border border-gray-300 rounded"
                            onChange={setView}
                            value={showGraph ? "graph" : showGrid ? "grid" : ""}
                        >
                            <option value="graph">Graph</option>
                            <option value="grid">Grid</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Visualization Section */}
            <div className="mt-6">
                {showGraph && (
                    <Graph
                        bar={selectedOption === 'electricity'}
                        line={selectedOption === 'weather'}
                        date={selectedDate || getTodayDate()}
                        selectedOption={selectedOption}
                        fetchData={fetchForecastData} // Pass the data fetcher
                        isForecast={true}
                    />
                )}
                {showGrid && (
                    <Grid
                        date={selectedDate || getTodayDate()}
                        selectedOption={selectedOption}
                        fetchData={fetchForecastData} // Pass the data fetcher
                        isForecast={true}
                    />
                )}
            </div>
        </div>
    );
};

export default Forecast;