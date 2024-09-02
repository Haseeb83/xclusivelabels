import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface RefundedOrder {
    month: string;
    refunds: number;
}
interface Props {
    refundedOrdersData: RefundedOrder[];
}

const RefundedOrders: React.FC<Props> = ({ refundedOrdersData }) => {

    return (
        <>
            {
                // if refundedOrdersData is empty, or undefined show the no data message
                refundedOrdersData?.length == 0 ? (
                    <div className="bg-white p-4 md:col-span-2  rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-2">Refunded Orders</h2>
                        <p className="text-center">No data available</p>
                    </div>
                ) : (
                    <div className="bg-white p-4 md:col-span-2  rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-2">Refunded Orders</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={refundedOrdersData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="orders" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )
            }
        </>
    );
};

export default RefundedOrders;
