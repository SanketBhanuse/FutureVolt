// import React from 'react';
// import { useState, useEffect } from 'react';

// function ElectricityDataGrid() {
//     const [electricityData, setElectricityData] = useState([

//         {
//             "maxLoad": 23592.20,
//             "maxLoadDateTime": "20/09/2024  - 08:00:00",
//             "minLoad": 16047.86,
//             "minLoadDateTime": "20/09/2024  - 02:00:00"
//         },
//         {
//             "maxLoad": 23939.45,
//             "maxLoadDateTime": "19/09/2024  - 10:00:00",
//             "minLoad": 17143.25,
//             "minLoadDateTime": "19/09/2024  - 04:00:00"
//         },
//         {
//             "maxLoad": 25428.92,
//             "maxLoadDateTime": "18/09/2024  - 12:00:00",
//             "minLoad": 17509.33,
//             "minLoadDateTime": "18/09/2024  - 06:00:00"
//         },
//         {
//             "maxLoad": 22838.14,
//             "maxLoadDateTime": "17/09/2024  - 14:00:00",
//             "minLoad": 17507.69,
//             "minLoadDateTime": "17/09/2024  - 08:00:00"
//         },
//         {
//             "maxLoad": 25151.69,
//             "maxLoadDateTime": "16/10/2024  - 16:00:00",
//             "minLoad": 18769.37,
//             "minLoadDateTime": "16/10/2024  - 10:00:00"
//         },
//         {
//             "maxLoad": 22873.09,
//             "maxLoadDateTime": "15/10/2024  - 18:00:00",
//             "minLoad": 17493.84,
//             "minLoadDateTime": "15/10/2024 -  12:00:00"
//         },
//         {
//             "maxLoad": 22051.19,
//             "maxLoadDateTime": "14/10/2024 -  20:00:00",
//             "minLoad": 17399.13,
//             "minLoadDateTime": "14/10/2024  - 14:00:00"
//         }

//         // Add more data for the rest of the week
//     ]);

//     return (
//         <div className="sm:p-4">
//             <div className="Header my-[20px]">
//                 <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Electricity Data for Past Week</div>
//             </div>
//             <div className="table_box bg-[#F2EFDF]">

//                 <div className="bg-[#AABFB9] grid grid-cols-4 gap-4 text-center border-2 border-[#283845]">
//                     <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845] ">Max Load</div>
//                     <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Date and Time</div>
//                     <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Min Load</div>
//                     <div className="text-[20px] font-bold p-2">Date and Time</div>
//                 </div>
//                 {electricityData.map((data, index) => (
//                     <div className='border-2 border-b-0 last:border-b-2 border-[#283845]' key={index}>
//                         <div className="grid grid-cols-4 gap-4 ">
//                             <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.maxLoad} MW</div>
//                             <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.maxLoadDateTime}</div>
//                             <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.minLoad} MW</div>
//                             <div className="text-[18px] p-2 ">{data.minLoadDateTime}</div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ElectricityDataGrid;

import React from 'react';
import { useState, useEffect } from 'react';

function ElectricityDataGrid() {
    const [electricityData, setElectricityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeekData = async () => {
            try {
                // Get dates for the past 7 days
                const dates = [];
                for (let i = 0; i < 7; i++) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    dates.push(formatDate(date));
                }

                // Fetch data for each date
                const dailyDataPromises = dates.map(date =>
                    fetch(`https://futurevolt-backend.onrender.com/api/load/${date}`)
                        .then(response => {
                            if (!response.ok) throw new Error('Network response was not ok');
                            return response.json();
                        })
                );

                const dailyData = await Promise.all(dailyDataPromises);

                // Process data to find min and max for each day
                const processedData = dailyData.map((dayData, index) => {
                    if (!dayData || dayData.length === 0) {
                        const fallbackDate = new Date();
                        fallbackDate.setDate(fallbackDate.getDate() - index);
                        return {
                            date: formatDate(fallbackDate),
                            maxLoad: 'N/A',
                            maxLoadTime: 'N/A',
                            minLoad: 'N/A',
                            minLoadTime: 'N/A'
                        };
                    }

                    // Filter out entries with Load = 0 or null if needed
                    const validEntries = dayData.filter(entry => entry.Load !== 0 && entry.Load !== null);

                    if (validEntries.length === 0) {
                        return {
                            date: dayData[0]?.Date || formatDate(new Date(new Date().setDate(new Date().getDate() - index))),
                            maxLoad: 'N/A',
                            maxLoadTime: 'N/A',
                            minLoad: 'N/A',
                            minLoadTime: 'N/A'
                        };
                    }

                    // Find max load entry
                    const maxEntry = validEntries.reduce((max, entry) =>
                        entry.Load > max.Load ? entry : max, validEntries[0]);

                    // Find min load entry
                    const minEntry = validEntries.reduce((min, entry) =>
                        entry.Load < min.Load ? entry : min, validEntries[0]);

                    return {
                        date: maxEntry.Date,
                        maxLoad: maxEntry.Load.toFixed(2),
                        maxLoadTime: maxEntry.Time.split('-')[0].trim(),
                        minLoad: minEntry.Load.toFixed(2),
                        minLoadTime: minEntry.Time.split('-')[0].trim()
                    };
                });

                setElectricityData(processedData);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeekData();
    }, []);

    // Helper function to format date as DD-MM-YYYY
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (loading) {
        <div className="h-64 w-full bg-gray-300 rounded animate-pulse flex items-center justify-center">
            <div className="text-gray-600 text-lg font-medium">Loading Electricity Data...</div>
        </div>
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="sm:p-4">
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Electricity Data for Past Week</div>
            </div>
            <div className="table_box bg-[#F2EFDF]">
                <div className="bg-[#AABFB9] grid grid-cols-5 gap-4 text-center border-2 border-[#283845]">
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Date</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Max Load (MW)</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Time</div>
                    <div className="text-[20px] font-bold p-2 border-r-2 border-[#283845]">Min Load (MW)</div>
                    <div className="text-[20px] font-bold p-2">Time</div>
                </div>
                {electricityData.map((data, index) => (
                    <div className='border-2 border-b-0 last:border-b-2 border-[#283845]' key={index}>
                        <div className="grid grid-cols-5 gap-4">
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.date}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">
                                {data.maxLoad === 'N/A' ? 'N/A' : data.maxLoad}
                            </div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">{data.maxLoadTime}</div>
                            <div className="text-[18px] p-2 border-r-2 border-[#283845]">
                                {data.minLoad === 'N/A' ? 'N/A' : data.minLoad}
                            </div>
                            <div className="text-[18px] p-2">{data.minLoadTime}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ElectricityDataGrid;