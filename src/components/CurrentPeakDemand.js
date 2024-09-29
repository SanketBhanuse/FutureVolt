import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import Button from './Button';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const CurrentPeakDemand = ({ bar, line }) => {
    const navigate = useNavigate();
    const [peakDemand, setPeakDemand] = useState(0);

    const gotoFutureData = () => {
        navigate('/futuredata');
    };

    // Generate random electricity demand data and get the peak demand
    const generateRandomData = () => {
        const data = [];
        for (let i = 0; i < 24; i++) {
            data.push(Math.floor(Math.random() * 7000) + 18000); // Random values between 18,000 and 25,000
        }
        return data;
    };

    // Get current hour labels (0 to 23)
    const generateHourLabels = () => {
        return Array.from({ length: 24 }, (_, i) => `${i}:00`);
    };

    const [dataArray, setDataArray] = useState(generateRandomData());

    useEffect(() => {
        // Find the peak demand value when dataArray changes
        const peakDemandIndex = dataArray.indexOf(Math.max(...dataArray));
        const peakValue = dataArray[peakDemandIndex];
        setPeakDemand(peakValue); // Set peak demand value in the state
    }, [dataArray]); // Runs only when dataArray changes

    const peakDemandIndex = dataArray.indexOf(Math.max(...dataArray)); // Find the index of peak demand

    const data = {
        labels: generateHourLabels(),
        datasets: [
            {
                label: 'Electricity Demand (MW)',
                data: dataArray,
                backgroundColor: dataArray.map((_, index) =>
                    index === peakDemandIndex ? 'rgba(191, 124, 65, 0.7)' : 'rgba(170,191,185,0.5)' // Highlight peak demand bar
                ),
                borderColor: dataArray.map((_, index) =>
                    index === peakDemandIndex ? 'rgba(191, 124, 65, 1)' : 'rgba(170,191,185,1)' // Highlight peak demand border
                ),
                borderWidth: 1,
                tension: 0.4, // Adds smooth curves
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Electricity Demand for Today (Hourly)',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += `${context.raw} MW`;
                        if (context.dataIndex === peakDemandIndex) {
                            label += ' (Peak Demand)';
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Electricity Demand (MW)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='container sm:p-4 mx-auto '>
            <div className="Header my-[20px]">
                <div className="heading text-center text-[32px] font-bold text-[#0F1926]">Today's Electricity Demand Overview</div>
            </div>
            <div className="demandinfo grid grid-cols-10 gap-1">
                <div className="chart col-span-10 md:col-span-7">
                    {bar ? <Bar data={data} options={options} /> : ""}
                    {line ? <Line data={data} options={options} /> : ""}
                </div>
                <div className="info p-10 col-span-10 text-center md:col-span-3 flex justify-center items-center">
                    <div className='p-5 rounded-md flex justify-center items-center flex-col gap-3' style={{ boxShadow: '0px 0px 10px 1px rgba(40, 56, 69, 0.75)' }}>
                        <div className="Sub_Heading text-[#BF7C41] font-semibold">Peak Demand: {peakDemand} MW 21/9/2024 at {peakDemandIndex}:00{peakDemandIndex < 12 ? "AM" : "PM"}</div>
                        <div className="Description">The electricity demand for today fluctuated steadily, with the highest peak recorded at {peakDemand} MW around {peakDemandIndex}:00{peakDemandIndex < 12 ? "AM" : "PM"} </div>
                        <Button event={gotoFutureData} buttonName={"For Forecast Data"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentPeakDemand;
