import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface PaymentMethod {
    gateway: string;
    value: number;
}

interface Props {
    paymentMethodsData: PaymentMethod[];
}

const PaymentMethodsBreakdown: React.FC<Props> = ({ paymentMethodsData }) => {
    // Calculate the total value of all payment methods
    const totalAmount = paymentMethodsData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="bg-white md:col-span-2 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Payment Methods Breakdown</h2>
            <div className="mb-4">
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                <ul>
                    {paymentMethodsData.map((method, index) => (
                        <li key={index}>
                            {method.gateway}: {((method.value / totalAmount) * 100).toFixed(2)}% (${method.value.toFixed(2)})
                        </li>
                    ))}
                </ul>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={paymentMethodsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {paymentMethodsData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentMethodsBreakdown;

