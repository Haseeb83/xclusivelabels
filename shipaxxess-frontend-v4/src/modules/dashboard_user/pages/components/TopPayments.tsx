import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Register the custom plugin
ChartJS.register({
    id: 'roundedBar',
    beforeDraw: (chart) => {


        chart.clear();

    },
});

interface Payment {
    id: number;
    name: string;
    amount: number;
    date: string; // Format: 'YYYY-MM-DD'
    method: string;
    status: string;
    recipient: string;
}

interface TopPaymentsProps {
    payments: Payment[];
}

const TopPayments: React.FC<TopPaymentsProps> = ({ payments }) => {
    // Generate the labels for the current month and the previous four months
    const labels = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    }).reverse();

    // Initialize an object to store the total payments for each month
    const paymentsByMonth = labels.reduce((acc, label) => {
        acc[label] = 0;
        return acc;
    }, {} as Record<string, number>);

    // Group payments by month
    payments.forEach(payment => {
        const month = new Date(payment.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (paymentsByMonth[month] !== undefined) {
            paymentsByMonth[month] += payment.amount;
        }
    });

    // Extract data for the chart
    const data = labels.map(label => paymentsByMonth[label]);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Top Payments',
                data,
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Updated color to black
                borderColor: 'rgba(0, 0, 0, 0)', // Updated color to black
                borderWidth: 0,
                barThickness: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Top Payments by Month',
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

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Top Payments</h3>
            <h2 className="text-sm font-bold mb-4 text-gray-400 border-b-2 border-gray-300 pb-2">Overview</h2>
            <div className="bg-gray-100 p-4 rounded">
                <div className="mt-8">
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default TopPayments;
