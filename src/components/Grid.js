import React, { useState } from 'react';

function Grid() {
    const [electricityData, setElectricityData] = useState([
        {
            "date": "1-Jan-24",
            "time": "0",
            "weekday": "Monday",
            "temperature": 11,
            "humidity": 95,
            "weather": "Fog",
            "windspeed": 0
        },
        {
            "date": "1-Jan-24",
            "time": "6",
            "weekday": "Monday",
            "temperature": 13,
            "humidity": 82,
            "weather": "Fog",
            "windspeed": 7
        },
        {
            "date": "1-Jan-24",
            "time": "12",
            "weekday": "Monday",
            "temperature": 17,
            "humidity": 69,
            "weather": "Sunny",
            "windspeed": 6
        },
        {
            "date": "1-Jan-24",
            "time": "18",
            "weekday": "Monday",
            "temperature": 11,
            "humidity": 88,
            "weather": "Fog",
            "windspeed": 0
        },
        {
            "date": "2-Jan-24",
            "time": "0",
            "weekday": "Tuesday",
            "temperature": 10,
            "humidity": 94,
            "weather": "Fog",
            "windspeed": 2
        },
        {
            "date": "2-Jan-24",
            "time": "6",
            "weekday": "Tuesday",
            "temperature": 13,
            "humidity": 76,
            "weather": "Fog",
            "windspeed": 4
        },
        {
            "date": "2-Jan-24",
            "time": "12",
            "weekday": "Tuesday",
            "temperature": 17,
            "humidity": 58,
            "weather": "Sunny",
            "windspeed": 2
        },
        {
            "date": "2-Jan-24",
            "time": "18",
            "weekday": "Tuesday",
            "temperature": 9,
            "humidity": 94,
            "weather": "Fog",
            "windspeed": 2
        },
        {
            "date": "3-Jan-24",
            "time": "6",
            "weekday": "Wednesday",
            "temperature": 11,
            "humidity": 88,
            "weather": "Fog",
            "windspeed": 6
        },
        {
            "date": "3-Jan-24",
            "time": "12",
            "weekday": "Wednesday",
            "temperature": 15,
            "humidity": 70,
            "weather": "Sunny",
            "windspeed": 2
        },
        {
            "date": "3-Jan-24",
            "time": "18",
            "weekday": "Wednesday",
            "temperature": 10,
            "humidity": 94,
            "weather": "Fog",
            "windspeed": 2
        },
        {
            "date": "4-Jan-24",
            "time": "0",
            "weekday": "Thursday",
            "temperature": 10,
            "humidity": 95,
            "weather": "Fog",
            "windspeed": 6
        },
        {
            "date": "4-Jan-24",
            "time": "6",
            "weekday": "Thursday",
            "temperature": 12,
            "humidity": 86,
            "weather": "Fog",
            "windspeed": 8
        }
    ]);

    return (
        <div className="sm:p-4">
            <div className="table_box bg-[#F2EFDF]">
                {/* Table header */}
                <div className="bg-[#AABFB9] grid grid-cols-6 gap-4 text-center border-2 border-[#283845]">
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Date</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Time</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Weekday</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Temperature (°C)</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Humidity (%)</div>
                    <div className="text-[20px] font-bold p-2">Weather Condition</div>
                </div>

                {/* Table data */}
                {electricityData.map((data, index) => (
                    <div className='border-2 border-b-0 last:border-b-2 border-[#283845]' key={index}>
                        <div className="grid grid-cols-6 gap-4">
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.date}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.time}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.weekday}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.temperature}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.humidity}</div>
                            <div className="text-[18px] p-2">{data.weather}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Grid;
