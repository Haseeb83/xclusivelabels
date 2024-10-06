import React from "react";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PeakOrderTime {
	hours: string;
	orders: number;
}
interface Props {
	peakOrderTimesData: PeakOrderTime[] | undefined | [];
}

const PeakOrderTimes: React.FC<Props> = ({ peakOrderTimesData }) => {
	return (
		<>
			{peakOrderTimesData?.length === 0 ? (
				<div className="flex justify-center items-center text-center">No Data available for Peak order time</div>
			) : (
				<div className="bg-white p-4 md:col-span-2 rounded-lg shadow-md">
					<h2 className="text-lg font-bold mb-2">Peak Order Times (Today)</h2>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={peakOrderTimesData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="hours" />
							<Tooltip />
							<Bar dataKey="orders" fill="#8884d8" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			)}
		</>
	);
};

export default PeakOrderTimes;