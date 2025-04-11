import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
    if (!weatherData || !Array.isArray(weatherData) || weatherData.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 bg-[#F2EFDF] rounded-md"
                style={{ border: '2px dashed #AABFB9' }}>
                <div className="text-[#0F1926] text-xl font-bold">No weather data available</div>
            </div>
        );
    }

    // Process data for chart
    const labels = weatherData.map(item => {
        const time = item.Time.split('-')[0].trim();
        const [hours] = time.split(':');
        const hour = parseInt(hours, 10);
        return `${hour % 12 || 12}${hour >= 12 ? 'PM' : 'AM'}`;
    });

    const temperatureData = weatherData.map(item => item.Temperature);
    const humidityData = weatherData.map(item => item.Humidity);

    const data = {
        labels,
        datasets: [
            {
                label: "Temperature (°C)",
                data: temperatureData,
                borderColor: "rgba(191, 124, 65, 1)",
                backgroundColor: "rgba(191, 124, 65, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y',
            },
            {
                label: "Humidity (%)",
                data: humidityData,
                borderColor: "rgba(170, 191, 185, 1)",
                backgroundColor: "rgba(170, 191, 185, 0.2)",
                borderWidth: 2,
                tension: 0.4,
                yAxisID: 'y1',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: '#0F1926',
                    font: {
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: "Weather Data (Temperature & Humidity)",
                color: "#0F1926",
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
                        label += context.dataset.label.includes('Humidity') ? '%' : '°C';
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
                    text: 'Time',
                    color: '#0F1926'
                },
                grid: {
                    color: '#AABFB9',
                },
                ticks: {
                    color: '#0F1926'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: '#0F1926'
                },
                grid: {
                    color: '#AABFB9',
                },
                ticks: {
                    color: '#0F1926',
                    callback: function (value) {
                        return value + "°C";
                    },
                },
                beginAtZero: false,
            },
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
                min: 0,
                max: 100,
                ticks: {
                    color: '#0F1926',
                    callback: function (value) {
                        return value + "%";
                    },
                },
            }
        },
    };

    return (
        <div className="p-4 rounded-md bg-[#F2EFDF]">
            <Line data={data} options={options} />
        </div>
    );
};

export default WeatherChart;