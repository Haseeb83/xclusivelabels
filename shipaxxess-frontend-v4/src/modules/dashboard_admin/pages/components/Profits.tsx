import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define the Profit interface with optional refunded and pending refunded amounts
interface Profit {
    month: string;
    profit: number;
    refundedAmount?: number; // refunded orders amount
    pendingRefundedAmount?: number; // pending refunded amount
}

interface Props {
    profitsData: Profit[];
    resellerCostData: { [weight: string]: number }; // reseller cost data based on weights
}

const Profits: React.FC<Props> = ({ profitsData, resellerCostData }) => {
    // Calculate total refunded and pending refunded amounts
    const totalRefundedAmount = profitsData.reduce((acc, curr) => acc + (curr.refundedAmount || 0), 0);
    const totalPendingRefundedAmount = profitsData.reduce((acc, curr) => acc + (curr.pendingRefundedAmount || 0), 0);

    // Calculate profits based on reseller cost
    const calculatedProfitsData = profitsData.map((data) => {
        const weight = data.month; // Assuming weight corresponds to the month (modify as per actual data structure)
        const resellerCost = resellerCostData[weight] || 0;
        const actualProfit = data.profit - resellerCost;
        return { ...data, profit: actualProfit };
    });

    return (
        <div className="bg-white md:col-span-2 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Profits</h2>
            <div className="mb-4">
                <p>Total Refunded Amount: ${totalRefundedAmount.toFixed(2)}</p>
                <p>Total Pending Refunded Amount: ${totalPendingRefundedAmount.toFixed(2)}</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={calculatedProfitsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Profits;
