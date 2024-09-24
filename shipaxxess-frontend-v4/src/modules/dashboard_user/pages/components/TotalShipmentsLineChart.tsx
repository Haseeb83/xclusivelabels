import { Boxes } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TotalShipmentsData {
    month: string;
    shipments: number;
}

const generateRandomData = (): TotalShipmentsData[] => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.map(month => {
        const baseShipments = Math.floor(Math.random() * 800) + 200; // Random number between 200 and 1000
        const fluctuations = Math.floor(Math.random() * 100) - 50; // Random number between -50 and 50
        const shipments = baseShipments + fluctuations;
        return {
            month,
            shipments
        };
    });
};

const TotalShipmentsLineChart: React.FC = () => {
    const [totalShipmentsData, setTotalShipmentsData] = useState<TotalShipmentsData[]>([]);

    useEffect(() => {
        const data = generateRandomData();
        setTotalShipmentsData(data);
    }, []);

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className='flex justify-normal gap-x-1'>
                <Boxes size={24} />
                <h2 className="text-lg font-bold mb-2">Total Shipments</h2>
            </ div>
            <h2 className="text-sm font-bold mb-4 text-gray-400 border-b-2 border-gray-300 pb-2">Overview</h2>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={totalShipmentsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="shipments" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalShipmentsLineChart;
