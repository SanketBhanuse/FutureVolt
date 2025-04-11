// Grid.js
import React, { useState, useEffect } from 'react';

function Grid({ date }) {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/load/${date}`);
                if (!response.ok) throw new Error('Network response was not ok');

                const apiData = await response.json();

                // Transform data for grid display
                const transformedData = apiData.map(item => ({
                    date: item.Date,
                    time: item.Time.split('-')[0], // Get start hour
                    weekday: item.Weekday,
                    temperature: item.Temperature,
                    humidity: item.Humidity,
                    weather: item.Condition,
                    windspeed: item.Wind_Speed,
                    load: item.Load,
                    event: item.Event || 'None'
                }));

                setGridData(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (date) fetchData();
    }, [date]);

    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error: {error}</div>;
    if (gridData.length === 0) return <div>No data available for selected date</div>;

    return (
        <div className="sm:p-4">
            <div className="table_box bg-[#F2EFDF]">
                {/* Table header */}
                <div className="bg-[#AABFB9] grid grid-cols-7 gap-4 text-center border-2 border-[#283845]">
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Date</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Time</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Weekday</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Temperature (°C)</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Humidity (%)</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Weather</div>
                    <div className="text-[20px] font-bold p-2">Load (MW)</div>
                </div>

                {/* Table data */}
                {gridData.map((data, index) => (
                    <div className='border-2 border-b-0 last:border-b-2 border-[#283845]' key={index}>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.date}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.time}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.weekday}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.temperature}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.humidity}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.weather}</div>
                            <div className="text-[18px] p-2">{data.load}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Grid;