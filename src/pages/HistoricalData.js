import React, { useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import Graph from '../components/Graph';
import Grid from '../components/Grid';

const HistoricalData = () => {
    const [selectedOption, setSelectedOption] = useState('electricity'); // Default to electricity
    const [showEvent, setShowEvent] = useState(false);
    const [showSeason, setShowSeason] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [showGraph, setShowGraph] = useState(true); // Show graph by default
    const [showGrid, setShowGrid] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const formatted = yesterday.toLocaleDateString('en-GB').split('/').join('-'); // dd-mm-yyyy
        return formatted;
    }); // Default date matching your sample data
    // const [selectedEvent, setSelectedEvent] = useState('');
    // const [selectedSeason, setSelectedSeason] = useState('');
    // const [selectedCompany, setSelectedCompany] = useState('');

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        // Reset checkboxes and filters when changing the dropdown
        if (value !== 'electricity') {
            setShowEvent(false);
            setShowSeason(false);
            setShowCompany(false);
            // setSelectedEvent('');
            // setSelectedSeason('');
            // setSelectedCompany('');
        }
    };

    const getMinDate = () => {
        return selectedOption === 'weather' ? '2010-01-01' : '2018-01-01';
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
        } else {
            setShowGrid(false);
            setShowGraph(false);
        }
    };

    // const toggleDropdown = (type) => {
    //     if (type === 'event') {
    //         setShowEvent(!showEvent);
    //         if (showEvent) setSelectedEvent('');
    //     }
    //     if (type === 'season') {
    //         setShowSeason(!showSeason);
    //         if (showSeason) setSelectedSeason('');
    //     }
    //     if (type === 'company') {
    //         setShowCompany(!showCompany);
    //         if (showCompany) setSelectedCompany('');
    //     }
    // };

    // const handleEventChange = (e) => {
    //     setSelectedEvent(e.target.value);
    // };

    // const handleSeasonChange = (e) => {
    //     setSelectedSeason(e.target.value);
    // };

    // const handleCompanyChange = (e) => {
    //     setSelectedCompany(e.target.value);
    // };

    // Format today's date as YYYY-MM-DD for the date input default value
    const getTodayDate = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1); // Set to yesterday
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="container sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Historical Data</div>
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
                            placeholder={getTodayDate()}
                            className="p-2 border border-gray-300 rounded"
                            onChange={handleDateChange}
                            defaultValue={getTodayDate()}
                            min={getMinDate()}
                            max={getTodayDate()}
                        />
                    </div>

                    {/* {selectedOption === 'electricity' && (
                        <div className="checkboxes flex gap-3 items-center">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showEvent}
                                    onChange={() => toggleDropdown('event')}
                                    className="mr-2"
                                />
                                Event
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showSeason}
                                    onChange={() => toggleDropdown('season')}
                                    className="mr-2"
                                />
                                Season
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={showCompany}
                                    onChange={() => toggleDropdown('company')}
                                    className="mr-2"
                                />
                                Company
                            </label>
                        </div>
                    )} */}

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

                {/* <div className='grid grid-cols-3 gap-4 my-2'>
                    {showEvent && (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="event" className="font-medium text-gray-700">Select Event</label>
                            <select
                                id="event"
                                className="p-2 border border-gray-300 rounded"
                                value={selectedEvent}
                                onChange={handleEventChange}
                            >
                                <option value="">--Select--</option>
                                <option value="New Year's Day">New Year's Day</option>
                                <option value="Republic Day">Republic Day</option>
                                <option value="Holi">Holi</option>
                                <option value="Diwali">Diwali</option>
                                <option value="Independence Day">Independence Day</option>
                            </select>
                        </div>
                    )}

                    {showSeason && (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="season" className="font-medium text-gray-700">Select Season</label>
                            <select
                                id="season"
                                className="p-2 border border-gray-300 rounded"
                                value={selectedSeason}
                                onChange={handleSeasonChange}
                            >
                                <option value="">--Select--</option>
                                <option value="winter">Winter</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                                <option value="monsoon">Monsoon</option>
                                <option value="autumn">Autumn</option>
                            </select>
                        </div>
                    )}

                    {showCompany && (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="company" className="font-medium text-gray-700">Select Company</label>
                            <select
                                id="company"
                                className="p-2 border border-gray-300 rounded"
                                value={selectedCompany}
                                onChange={handleCompanyChange}
                            >
                                <option value="">--Select--</option>
                                <option value="BRPL">BRPL</option>
                                <option value="BYPL">BYPL</option>
                                <option value="NDPL">NDPL</option>
                                <option value="NDMC">NDMC</option>
                                <option value="MES">MES</option>
                            </select>
                        </div>
                    )}
                </div> */}
            </div>

            {/* Data Visualization Section */}
            <div className="mt-6">
                {showGraph && (
                    <Graph
                        bar={true}
                        date={selectedDate}
                        // event={selectedEvent}
                        // season={selectedSeason}
                        // company={selectedCompany}
                        selectedOption={selectedOption}
                    />
                )}
                {showGrid && (
                    <Grid
                        date={selectedDate}
                    // event={selectedEvent}
                    // season={selectedSeason}
                    // company={selectedCompany}
                    />
                )}
            </div>
        </div>
    );
};

export default HistoricalData;