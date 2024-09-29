import React from 'react'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

const Graph = ({ bar, line }) => {
    // Generate random electricity demand data and get the peak demand
    const generateRandomData = () => {
        const data = [];
        for (let i = 0; i < 24; i++) {
            data.push(Math.floor(Math.random() * 7000) + 18000); // Random values between 100 and 600
        }
        return data;
    };

    // Get current hour labels (0 to 23)
    const generateHourLabels = () => {
        return Array.from({ length: 24 }, (_, i) => `${i}:00`);
    };

    const dataArray = generateRandomData();
    const peakDemandIndex = dataArray.indexOf(Math.max(...dataArray)); // Find the index of peak demand
    const MinDemandIndex = dataArray.indexOf(Math.min(...dataArray)); // Find the index of peak demand

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
            // {
            //     label: 'Peak Electricity Demand (MW)',
            //     backgroundColor: 'rgba(191, 124, 65, 0.7)',
            //     borderColor: 'rgba(191, 124, 65, 1)',
            //     borderWidth: 1,
            // }
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
                text: 'Electricity Demand ',
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
        <div>
            {bar ? <Bar data={data} options={options} /> : ""}
            {line ? <Line data={data} options={options} /> : ""}
        </div>
    )
}

export default Graph
