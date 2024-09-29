import React, { useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import Graph from '../components/Graph';
import Grid from '../components/Grid';

const FutureData = () => {
    const [selectedOption, setSelectedOption] = useState(''); // Track selected option (weather/electricity)
    const [showEvent, setShowEvent] = useState(false);
    const [showSeason, setShowSeason] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [showGrid, setShowGrid] = useState(false);

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        // Reset checkboxes and right section when changing the dropdown
        if (value !== 'electricity') {
            setShowEvent(false);
            setShowSeason(false);
            setShowCompany(false);
        }
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
    }

    const toggleDropdown = (type) => {
        if (type === 'event') setShowEvent(!showEvent);
        if (type === 'season') setShowSeason(!showSeason);
        if (type === 'company') setShowCompany(!showCompany);
    };

    const isRightBoxVisible = showEvent || showSeason || showCompany; // Show right box only if one of these is true

    return (
        <div className="container sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Future Data</div>
            </div>
            <div className="filters border rounded-md border-[#0F1926] p-4">
                <div className="title text-[18px] flex gap-2 items-center"> <IoFilterSharp /> Filters :</div>
                <div className=' grid grid-cols-2 gap-4 '>
                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="weather-electricity" className="font-medium text-gray-700">Select Data:</label>
                        <select
                            id="weather-electricity"
                            className="p-2 border border-gray-300 rounded accent-[#0F1926]"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="">--Select--</option>
                            <option value="weather">Weather</option>
                            <option value="electricity">Electricity</option>
                        </select>
                    </div>
                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="date" className="font-medium text-gray-700">Date:</label>
                        <input type="date" id="date" className="p-2 border border-gray-300 rounded" />
                    </div>
                    {selectedOption === 'electricity' && (
                        <div className="checkboxes flex gap-3 ">
                            <label>
                                <input type="checkbox" onChange={() => toggleDropdown('event')} className="" /> Event
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => toggleDropdown('season')} className="" /> Season
                            </label>
                            <label>
                                <input type="checkbox" onChange={() => toggleDropdown('company')} className="" /> Company
                            </label>
                        </div>
                    )}
                    <div className="selection-row flex flex-col space-y-2">
                        <label htmlFor="view-type" className="font-medium text-gray-700">Select View:</label>
                        <select id="view-type" className="p-2 border border-gray-300 rounded" onChange={setView}>
                            <option value="">--Select View--</option>
                            <option value="graph">Graph</option>
                            <option value="grid">Grid</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4 my-2'>

                    {showEvent && (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="event" className="font-medium text-gray-700">Select Event</label>
                            <select id="event" className="p-2 border border-gray-300 rounded">
                                <option value="">--Select--</option>
                                <option value="Republic_Day">Republic Day</option>
                                <option value="Holi">Holi</option>
                                <option value="Diwali">Diwali</option>
                                <option value="Independence_Day">Independence Day</option>
                            </select>
                        </div>
                    )}

                    {showSeason && (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="season" className="font-medium text-gray-700">Select Season</label>
                            <select id="season" className="p-2 border border-gray-300 rounded">
                                <option value="">--Select--</option>
                                <option value="winter">Winter</option>
                                <option value="spring">Spring</option>
                                <option value="summer">Summer</option>
                                <option value="fall">Fall</option>
                            </select>
                        </div>
                    )}

                    {showCompany && (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="company" className="font-medium text-gray-700">Select Company</label>
                            <select id="company" className="p-2 border border-gray-300 rounded">
                                <option value="">--Select--</option>
                                <option value="BRPL">BRPL</option>
                                <option value="BYPL">BYPL</option>
                                <option value="NDPL">NDPL</option>
                                <option value="NDMC">NDMC</option>
                                <option value="MES">MES</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>
            {showGraph ? <Graph bar={true} /> : showGrid ? <Grid /> : ""}
        </div>
    );
};

export default FutureData;
