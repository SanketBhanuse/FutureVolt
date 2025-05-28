import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import Button from './Button';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const CurrentPeakDemand = ({ bar, line }) => {
    const navigate = useNavigate();
    const [peakDemand, setPeakDemand] = useState(0);
    const [peakDemandTime, setPeakDemandTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiData, setApiData] = useState([]);

    const gotoFutureData = () => {
        navigate('/futuredata');
    };

    // Get current date in DD-MM-YYYY format
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Fetch current date data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentDate = getCurrentDate();
                const response = await fetch(`https://futurevolt-backend.onrender.com/api/load/${currentDate}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setApiData(data);

                if (data && data.length > 0) {
                    // Find peak demand
                    const peakEntry = data.reduce((max, entry) =>
                        entry.Load > max.Load ? entry : max, data[0]);

                    setPeakDemand(peakEntry.Load);

                    // Extract time from Time field (e.g., "11:00-12:00" -> "11:00")
                    const peakTime = peakEntry.Time.split('-')[0].trim();
                    setPeakDemandTime(peakTime);
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-64 w-full bg-gray-300 rounded animate-pulse flex items-center justify-center">
                <div className="text-gray-600 text-lg font-medium">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-[#BF7C41] text-lg">Error: {error}</div>
            </div>
        );
    }

    if (!apiData || apiData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 bg-[#F2EFDF] rounded-md"
                style={{ border: '2px dashed #AABFB9' }}>
                <div className="text-[#0F1926] text-xl font-bold">No data available for today</div>
            </div>
        );
    }

    // Process data for chart
    const labels = apiData.map(item => item.Time.split('-')[0].trim());
    const loadData = apiData.map(item => item.Load);
    const peakDemandIndex = loadData.indexOf(Math.max(...loadData));

    const data = {
        labels,
        datasets: [
            {
                label: 'Electricity Demand (MW)',
                data: loadData,
                backgroundColor: loadData.map((_, index) =>
                    index === peakDemandIndex ? 'rgba(191, 124, 65, 0.7)' : 'rgba(170,191,185,0.5)'
                ),
                borderColor: loadData.map((_, index) =>
                    index === peakDemandIndex ? 'rgba(191, 124, 65, 1)' : 'rgba(170,191,185,1)'
                ),
                borderWidth: 1,
                tension: 0.4,
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
                text: `Electricity Demand for ${getCurrentDate()} (Hourly)`,
                color: '#0F1926',
                font: {
                    size: 16,
                    weight: 'bold'
                }
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
                backgroundColor: '#F2EFDF',
                titleColor: '#0F1926',
                bodyColor: '#0F1926',
                borderColor: '#BF7C41',
                borderWidth: 1
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours',
                    color: '#0F1926'
                },
                grid: {
                    color: '#AABFB9'
                },
                ticks: {
                    color: '#0F1926'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Electricity Demand (MW)',
                    color: '#0F1926'
                },
                beginAtZero: true,
                grid: {
                    color: '#AABFB9'
                },
                ticks: {
                    color: '#0F1926'
                }
            },
        },
    };

    // Format time for display (convert "11:00" to "11:00 AM/PM")
    const formatTimeDisplay = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum;
        return `${displayHour}:00`;
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
                        <div className="Sub_Heading text-[#BF7C41] font-semibold">
                            Peak Demand: {peakDemand} MW on {getCurrentDate()} at {formatTimeDisplay(peakDemandTime)}
                        </div>
                        <div className="Description">
                            The electricity demand for today shows the highest peak at {peakDemand} MW around {formatTimeDisplay(peakDemandTime)}
                        </div>
                        <Button event={gotoFutureData} buttonName={"For Forecast Data"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentPeakDemand;