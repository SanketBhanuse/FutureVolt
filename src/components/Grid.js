import React, { useState, useEffect } from 'react';

function Grid({ date, isForecast = false, forecastData = [] }) {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isForecast) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${date}`);
                    if (!response.ok) throw new Error('Network response was not ok');

                    const data = await response.json();
                    setApiData(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            if (date) fetchData();
        } else {
            setLoading(false);
        }
    }, [date, isForecast]);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-[#0F1926] text-lg">Loading data...</div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-[#BF7C41] text-lg">Error: {error}</div>
        </div>
    );

    const dataToUse = isForecast ? forecastData : apiData;
    if (!dataToUse || dataToUse.length === 0) return (
        <div className="flex items-center justify-center h-64 bg-[#F2EFDF] rounded-md"
            style={{ border: '2px dashed #AABFB9' }}>
            <div className="text-[#0F1926] text-xl font-bold">No data available</div>
        </div>
    );

    // Transform data for grid display
    const transformedData = dataToUse.map(item => ({
        date: item.Date,
        time: item.Time.split('-')[0],
        weekday: item.Weekday,
        temperature: item.Temperature,
        humidity: item.Humidity,
        weather: item.Condition,
        windspeed: item.Wind_Speed,
        load: item.Load,
        event: item.Event || 'None'
    }));

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
                    <div className="text-[20px] font-bold p-2">
                        {isForecast ? 'Forecast Load (MW)' : 'Load (MW)'}
                    </div>
                </div>

                {/* Table data */}
                {transformedData.map((data, index) => (
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