import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ServiceData {
    name: string;
    value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ServicePieChart: React.FC = () => {
    const data: ServiceData[] = [
        { name: 'Service 1', value: 400 },
        { name: 'Service 2', value: 300 },

    ];

    return (
        <div className='w-full'>
            <h2 className="text-2xl font-semibold">Services</h2>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label

                >
                    {data.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default ServicePieChart;