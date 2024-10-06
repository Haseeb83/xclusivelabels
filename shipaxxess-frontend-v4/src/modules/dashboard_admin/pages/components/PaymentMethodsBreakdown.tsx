import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
interface PaymentMethod {
	gateway: string;
	value: number;
}
interface Props {
	paymentMethodsBreakdownByGateway: PaymentMethod[];
}
const PaymentMethodsBreakdown: React.FC<Props> = ({ paymentMethodsBreakdownByGateway }) => {
	const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	return (
		<div className="bg-white  md:col-span-2  p-4 rounded-lg shadow-md">
			<h2 className="text-lg font-bold mb-2">Payment Methods Breakdown</h2>
			{paymentMethodsBreakdownByGateway?.length < 1 && <div>No data available</div>}
			{paymentMethodsBreakdownByGateway?.length > 0 && <ResponsiveContainer width="100%" height={400}>
				<PieChart>
					<Pie
						nameKey="gateway"
						data={paymentMethodsBreakdownByGateway}
						cx="50%"
						cy="50%"
						labelLine={false}
						paddingAngle={2}
						label={({ gateway, value }) => (value > 9 ? `${gateway}: $${value}` : "")}
						outerRadius={120}
						innerRadius={80}
						fill="#8884d8"
						dataKey="value">
						{paymentMethodsBreakdownByGateway?.map((_entry, index: number) => (
							<Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS?.length]} />
						))}
					</Pie>
					<Legend verticalAlign="bottom" height={15} />
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>}
		</div>
	);
};

export default PaymentMethodsBreakdown;