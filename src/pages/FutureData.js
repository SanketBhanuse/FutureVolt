import React, { useState, useEffect } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import Graph from '../components/Graph';
import Grid from '../components/Grid';

const Forecast = () => {
    const [selectedOption, setSelectedOption] = useState('electricity');
    const [showGraph, setShowGraph] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    });
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Helper function to get local date string in YYYY-MM-DD format
    const getLocalDateString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get today's date in DD-MM-YYYY format (matches your API format)
    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Get date 6 days from now in DD-MM-YYYY format
    const getMaxDate = () => {
        const today = new Date();
        const future = new Date(today);
        future.setDate(future.getDate() + 6);
        const day = String(future.getDate()).padStart(2, '0');
        const month = String(future.getMonth() + 1).padStart(2, '0');
        const year = future.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Convert YYYY-MM-DD (input format) to DD-MM-YYYY (API format)
    const formatDateForAPI = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleDateChange = (e) => {
        const apiFormattedDate = formatDateForAPI(e.target.value);
        setSelectedDate(apiFormattedDate);
    };

    // Fetch forecast data when selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${selectedDate}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setForecastData(data);
                } catch (err) {
                    console.error('Error fetching forecast data:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [selectedDate]);

    const setView = (e) => {
        const value = e.target.value;
        setShowGraph(value === "graph");
        setShowGrid(value === "grid");
    };

    return (
        <div className="container sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Forecast Data</div>
            </div>

            <div className="filters border rounded-md border-[#0F1926] p-4">
                <div className="title text-[18px] flex gap-2 items-center"><IoFilterSharp /> Filters :</div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="weather-electricity" className="font-medium text-gray-700">Select Data:</label>
                        <select
                            id="weather-electricity"
                            className="p-2 border border-gray-300 rounded accent-[#0F1926]"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
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
                            min={getLocalDateString(new Date())}
                            max={getLocalDateString(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000))}
                            defaultValue={getLocalDateString(new Date())}
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

            {/* Data Visualization Section */}
            <div className="mt-6">
                {loading ? (
                    <div className="h-64 w-full bg-gray-500 rounded animate-pulse flex items-center justify-center">
                        <div className="text-gray-600 text-lg font-medium">Loading FOrecast Data...</div>
                    </div>
                ) : (
                    <>
                        {showGraph && (
                            <Graph
                                date={selectedDate || getTodayDate()}
                                selectedOption={selectedOption}
                                isForecast={true}
                                forecastData={forecastData}
                            />
                        )}
                        {showGrid && (
                            <Grid
                                date={selectedDate || getTodayDate()}
                                isForecast={true}
                                forecastData={forecastData}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Forecast;