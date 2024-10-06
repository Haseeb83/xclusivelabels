import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    label: string;
    value: number;
}

interface GenericLineChartProps {
    data: ChartData[];
    title: string;
    valueKey: string;
    icon: React.ReactNode;
    width?: number;
    height?: number;
    xAxisLink?: string;
    isDollarIcon?: boolean;
}

const GenericLineChart: React.FC<GenericLineChartProps> = ({ data, title, valueKey, icon, width = "100%", height = 400, isDollarIcon=true }) => {
    const totalValue = data.reduce((acc, item) => Number(acc) + Number(item.value), 0).toFixed(2);
    const tooltipFormatter = (value: number) => {
        return [`${isDollarIcon ? "$" : ""}${value}`]; 
    };

  
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className='flex justify-center gap-x-1'>
                {icon}
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
            </div>
            <div className="flex justify-center mb-4">
                <h3 className="text-xl font-bold">{totalValue}</h3>
            </div>

            <ResponsiveContainer width={width} height={height}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label"
                    />
                  <Tooltip 
                        formatter={tooltipFormatter} 
                    />
                    <Legend />
                    <Line
                        type="linear"
                        dataKey={valueKey}
                        stroke="#000000"
                        strokeDasharray="8 8"
                        strokeWidth={3}
                        dot={{ r: 6, fill: '#000000', stroke: 'none' }} // Filled dots with no stroke
                    />
                </LineChart>

            </ResponsiveContainer>
        </div>
    );
};

export default GenericLineChart;