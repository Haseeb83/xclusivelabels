import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface State {
    id: number;
    name: string;
    value: number; 
}

interface TopStatesProps {
    states: State[];
}

const TopStates: React.FC<TopStatesProps> = ({ states }) => {
    // Prepare data for the chart
    const chartData = {
        labels: states.map(state => state.name),
        datasets: [
            {
                label: 'State Values',
                data: states.map(state => state.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

   
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `${context.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Top States</h3>
            <h2 className="text-sm font-bold mb-4 text-gray-400 border-b-2 border-gray-300 pb-2">Overview</h2>
            <div className="bg-gray-100 p-4 rounded mb-4">
                {states.map(state => (
                    <p key={state.id} className="text-gray-600 text-xl font-bold">{state.name}</p>
                ))}
            </div>
            <div className="bg-gray-100 p-4 rounded">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default TopStates;

