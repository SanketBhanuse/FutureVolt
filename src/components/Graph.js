import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const Graph = ({ date, selectedOption, isForecast = false, forecastData = [] }) => {
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
        <div className="h-64 w-full bg-gray-300 rounded animate-pulse flex items-center justify-center">
            <div className="text-gray-600 text-lg font-medium">Loading...</div>
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

    // Process data for chart
    const labels = dataToUse.map(item => item.Time.split('-')[0]);
    const chartData = {
        labels,
        datasets: []
    };

    if (selectedOption === 'electricity') {
        // Electricity data - show load as bar chart
        const loadData = dataToUse.map(item => item.Load);
        const peakValue = Math.max(...loadData);
        const peakIndex = loadData.indexOf(peakValue);

        chartData.datasets.push({
            label: isForecast ? 'Forecasted Load (MW)' : 'Electricity Load (MW)',
            data: loadData,
            backgroundColor: loadData.map((_, index) =>
                index === peakIndex ? 'rgba(191, 124, 65, 0.7)' : 'rgba(170,191,185,0.5)'
            ),
            borderColor: loadData.map((_, index) =>
                index === peakIndex ? 'rgba(191, 124, 65, 1)' : 'rgba(170,191,185,1)'
            ),
            borderWidth: 1,
            tension: 0.4,
        });
    } else {
        // Weather data - show temperature as line chart
        const temperatureData = dataToUse.map(item => item.Temperature);
        const humidityData = dataToUse.map(item => item.Humidity);

        chartData.datasets.push(
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                backgroundColor: 'rgba(191, 124, 65, 0.2)',
                borderColor: 'rgba(191, 124, 65, 1)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y',
            },
            {
                label: 'Humidity (%)',
                data: humidityData,
                backgroundColor: 'rgba(170, 191, 185, 0.2)',
                borderColor: 'rgba(170, 191, 185, 1)',
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1',
            }
        );
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: isForecast
                    ? `Forecasted ${selectedOption === 'electricity' ? 'Electricity Load' : 'Weather Data'}`
                    : `${selectedOption === 'electricity' ? 'Electricity Load' : 'Weather Data'}`,
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
                        if (label) label += ': ';
                        label += context.raw;
                        label += context.dataset.label.includes('Humidity') ? '%' :
                            context.dataset.label.includes('Temperature') ? '°C' : ' MW';
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
            y: selectedOption === 'electricity' ? {
                title: {
                    display: true,
                    text: isForecast ? 'Forecasted Load (MW)' : 'Electricity Load (MW)',
                    color: '#0F1926'
                },
                beginAtZero: true,
                grid: {
                    color: '#AABFB9'
                },
                ticks: {
                    color: '#0F1926'
                }
            } : {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: '#0F1926'
                },
                beginAtZero: false,
                grid: {
                    color: '#AABFB9'
                },
                ticks: {
                    color: '#0F1926'
                }
            },
            ...(selectedOption === 'weather' && {
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                        color: '#0F1926'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#0F1926'
                    }
                }
            })
        },
    };

    return (
        <div className="p-4 rounded-md">
            {selectedOption === 'electricity' ? (
                <Bar data={chartData} options={options} />
            ) : (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
};

export default Graph;