import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface Profit {
    month: string;
    profit: number;
}
interface Props {
    profitsData: Profit[];
}
const Profits: React.FC<Props> = ({ profitsData }) => {
    return (
        <div className="bg-white md:col-span-2  p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Profits</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={profitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />

                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Profits;