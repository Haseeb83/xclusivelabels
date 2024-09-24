import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Service {
    id: number;
    name: string;
}

interface TopServicesProps {
    services: Service[];
}

const TopServices: React.FC<TopServicesProps> = ({ services }) => {
    // Random data generation for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Number of Users',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0,
                barThickness: 20,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Number of Users per Month',

            },
        },
        scales: {
            x: {
                display: true, // Hide x-axis
            },
            y: {
                display: false, // Hide y-axis
            },

        },
    };
    console.log(services)
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Top Services</h3>
            <h2 className="text-sm font-bold mb-4 text-gray-400 border-b-2 border-gray-300 pb-2">Overview</h2>
            <div className="bg-gray-100 p-4 rounded">
                <div className="mt-8">

                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default TopServices;
