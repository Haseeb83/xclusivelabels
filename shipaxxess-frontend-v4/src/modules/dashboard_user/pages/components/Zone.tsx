import React from 'react';
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, Cell, ResponsiveContainer, Text } from 'recharts';
import { LandPlot } from 'lucide-react';

interface ChartData {
    zone: string;
    value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF1493', '#DAA520', '#ADFF2F', '#20B2AA', '#8B4513'];

const DateBarChart: React.FC = () => {
    // Generate random values for zones 1 to 9
    const data: ChartData[] = Array.from({ length: 9 }, (_, index) => ({
        zone: `Zone ${index + 1}`,
        value: Math.floor(Math.random() * 5000) + 1000, // Random value between 1000 and 6000
    }));

    return (
        <div className="bg-white p-4 md:col-span-2 rounded-lg shadow-md">


            <div className="flex justify-center ">
                <LandPlot size={24} />
                <h2 className="text-lg font-bold mb-2">Recipent Zones</h2>
                <Text textAnchor="middle" verticalAnchor="middle" width={30} height={30} />
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zone" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
};

export default DateBarChart;