import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface RefundedOrder {
	month: string;
	refunds: number;
}
interface Props {
	refundedOrdersData: RefundedOrder[];
}

const formatMonth = (month: string): string => {
	const monthAbbreviations: { [key: string]: string } = {
		January: "Jan",
		February: "Feb",
		March: "Mar",
		April: "Apr",
		May: "May",
		June: "Jun",
		July: "Jul",
		August: "Aug",
		September: "Sep",
		October: "Oct",
		November: "Nov",
		December: "Dec",
	};
	return monthAbbreviations[month] || month;
};

const RefundedOrders: React.FC<Props> = ({ refundedOrdersData }) => {
    console.log(refundedOrdersData);
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
							<LineChart data={refundedOrdersData}>
								<CartesianGrid stroke="#ccc" />
								<XAxis dataKey="date" textAnchor="middle" tickFormatter={formatMonth} />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="orders" stroke="#8884d8" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				)
			}
		</>
	);
};

export default RefundedOrders;