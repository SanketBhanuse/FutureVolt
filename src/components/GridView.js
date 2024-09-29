import React from 'react';
import { useState, useEffect } from 'react';

function ElectricityDataGrid() {
    const [electricityData, setElectricityData] = useState([

        {
            "maxLoad": 23592.20,
            "maxLoadDateTime": "20/09/2024  - 08:00:00",
            "minLoad": 16047.86,
            "minLoadDateTime": "20/09/2024  - 02:00:00"
        },
        {
            "maxLoad": 23939.45,
            "maxLoadDateTime": "19/09/2024  - 10:00:00",
            "minLoad": 17143.25,
            "minLoadDateTime": "19/09/2024  - 04:00:00"
        },
        {
            "maxLoad": 25428.92,
            "maxLoadDateTime": "18/09/2024  - 12:00:00",
            "minLoad": 17509.33,
            "minLoadDateTime": "18/09/2024  - 06:00:00"
        },
        {
            "maxLoad": 22838.14,
            "maxLoadDateTime": "17/09/2024  - 14:00:00",
            "minLoad": 17507.69,
            "minLoadDateTime": "17/09/2024  - 08:00:00"
        },
        {
            "maxLoad": 25151.69,
            "maxLoadDateTime": "16/10/2024  - 16:00:00",
            "minLoad": 18769.37,
            "minLoadDateTime": "16/10/2024  - 10:00:00"
        },
        {
            "maxLoad": 22873.09,
            "maxLoadDateTime": "15/10/2024  - 18:00:00",
            "minLoad": 17493.84,
            "minLoadDateTime": "15/10/2024 -  12:00:00"
        },
        {
            "maxLoad": 22051.19,
            "maxLoadDateTime": "14/10/2024 -  20:00:00",
            "minLoad": 17399.13,
            "minLoadDateTime": "14/10/2024  - 14:00:00"
        }

        // Add more data for the rest of the week
    ]);

    return (
        <div className="sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Electricity Data for Past Week</div>
            </div>
            <div className="table_box bg-[#F2EFDF]">

                <div className="bg-[#AABFB9] grid grid-cols-4 gap-4 text-center border-2 border-[#283845]">
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845] ">Max Load</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Date and Time</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Min Load</div>
                    <div className="text-[20px] font-bold p-2">Date and Time</div>
                </div>
                {electricityData.map((data, index) => (
                    <div className='border-2 border-b-0 last:border-b-2 border-[#283845]' key={index}>
                        <div className="grid grid-cols-4 gap-4 ">
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.maxLoad} MW</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.maxLoadDateTime}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.minLoad} MW</div>
                            <div className="text-[18px] p-2 ">{data.minLoadDateTime}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ElectricityDataGrid;