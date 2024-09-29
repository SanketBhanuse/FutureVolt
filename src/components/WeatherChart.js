import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { color } from "chart.js/helpers";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
    // Example weather data for one day with 3-hour intervals
    const timeLabels = [
        "12:00 AM", "3:00 AM", "6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"
    ];

    // Assuming weatherData is an array of temperature values in °C
    const temperatures = weatherData || [18, 17, 19, 21, 25, 24, 22, 20]; // Sample data

    const data = {
        labels: timeLabels,
        datasets: [
            {
                label: "Temperature (°C)",
                data: temperatures,
                fill: true,
                backgroundColor: "RGB(191,124,65 , 0.7)",
                borderColor: "#BF7C41",
                borderWidth: 2,
                tension: 0.4
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Temperature Over 24 Hours (3-hour intervals)",
                color: "#F2EFDF"
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#AABFB9', // Grid line color
                },
                ticks: {
                    color: '#BF7C41' // X-axis text color
                }
            },
            y: {
                grid: {
                    color: '#AABFB9', // Grid line color
                },


                beginAtZero: false,
                ticks: {
                    color: '#BF7C41',// Y-axis text color
                    callback: function (value) {
                        return value + "°C"; // Add °C to the y-axis labels
                    },
                },
            },
        },
    };

    return (
        <div className="">
            <Line data={data} options={options} />
        </div>
    )
};

export default WeatherChart;
