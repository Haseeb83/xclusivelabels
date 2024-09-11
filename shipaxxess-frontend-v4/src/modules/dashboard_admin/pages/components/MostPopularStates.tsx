import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface PopularState {
	state: string;
	orders: number;
}

interface Props {
	popularStatesData: PopularState[];
}

const MostPopularStates: React.FC<Props> = ({ popularStatesData }: Props) => {
	const sortedData = popularStatesData.sort((a: { orders: number }, b: { orders: number }) => b.orders - a.orders);

	const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";

	return (
		<div className="bg-white p-4 md:col-span-2 rounded-lg shadow-md">
			<h2 className="text-lg font-bold mb-2">Most Popular States</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={sortedData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="state" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="orders" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
			{/* State Graph */}
			<div className="mt-4">
				<h3 className="text-md font-bold">State Graph</h3>
				<ResponsiveContainer width="100%" height={300}>
					<ComposableMap projection="geoAlbersUsa">
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map((geo: { rsmKey: any }) => <Geography key={geo.rsmKey} geography={geo} />)
							}
						</Geographies>
					</ComposableMap>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default MostPopularStates;
