import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
interface RefundByCarrier {
    name: string;
    value: number;
}
interface Props {
    refundsByCarrierData: RefundByCarrier[];
}

const RefundsByCarrier: React.FC<Props> = ({ refundsByCarrierData }) => {
    return (
        <>
            {
                // handle the error or no data case
                refundsByCarrierData?.length == 0 ? (
                    <div className="bg-white md:col-span-2  p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-2">Refunds By Carrier</h2>
                        <p>No data available</p>
                    </div>
                ) : (
                    <div className="bg-white md:col-span-2  p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-2">Refunds By Carrier</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={refundsByCarrierData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {refundsByCarrierData?.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )
            }
        </>
    );
};

export default RefundsByCarrier;
