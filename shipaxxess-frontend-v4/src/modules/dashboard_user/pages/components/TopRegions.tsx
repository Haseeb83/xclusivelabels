import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, Cell, ResponsiveContainer } from "recharts";

interface RegionData {
	name: string;
	percentage: number;
	shipments: number;
	average: number;
}

interface TopRegionsProps {
	topStates: RegionData[];
	topCountries: RegionData[];
}

const TopRegions: React.FC<TopRegionsProps> = ({ topStates }) => {
	useEffect(() => {
		// Create a chart instance for US map
		const chartUS = am4core.create("chartUS", am4maps.MapChart);
		chartUS.zoomControl = new am4maps.ZoomControl();
		// create a color set for the heat map

		chartUS.geodata = am4geodata_usaLow;
		chartUS.projection = new am4maps.projections.AlbersUsa();

		const polygonSeriesUS = chartUS.series.push(new am4maps.MapPolygonSeries());
		polygonSeriesUS.useGeodata = true;

		// Configure map polygon series
		const polygonTemplate = polygonSeriesUS.mapPolygons.template;
		polygonTemplate.tooltipText = "{name}: {value}";
		polygonTemplate.fill = am4core.color("#D6D6DA");
		polygonTemplate.stroke = am4core.color("#FFFFFF");

		// Add data for US states
		polygonSeriesUS.data = topStates.map((state) => ({
			id: state.name, // ID should match geojson property for each state
			value: state.shipments, // Value to show in tooltip
		}));

		// Heat rule to colorize US states based on value
		polygonSeriesUS.heatRules.push({
			property: "fill",
			target: polygonSeriesUS.mapPolygons.template,
			min: am4core.color("#D6D6DA"),
			max: am4core.color("#FF5733"), // Example color for high values
			logarithmic: true, // Use logarithmic scale for colorization
		});

		// Create a chart instance for World map
		const chartWorld = am4core.create("chartWorld", am4maps.MapChart);
		chartWorld.zoomControl = new am4maps.ZoomControl();

		chartWorld.geodata = am4geodata_worldLow;
		chartWorld.projection = new am4maps.projections.EqualEarth();

		const polygonSeriesWorld = chartWorld.series.push(new am4maps.MapPolygonSeries());
		polygonSeriesWorld.useGeodata = true;
		polygonSeriesWorld.mapPolygons.template.fill = am4core.color("#D6D6DA");
		polygonSeriesWorld.mapPolygons.template.stroke = am4core.color("#FFFFFF");

		// Clean up when component unmounts
		return () => {
			chartUS.dispose();
			chartWorld.dispose();
		};
	}, [topStates]); // Re-run effect when topStates changes
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF1493", "#DAA520", "#ADFF2F", "#20B2AA", "#8B4513"];
	const data = topStates.map((item) => ({
		zone: `${item.name}`,
		value: item.shipments, // Random value between 1000 and 6000
	}));
	return (
		<div className="flex flex-col gap-y-8 m-10">
			<div className="flex flex-col md:flex-row justify-between">
				<div className="w-1/2">
					<h2 className="text-xl font-bold mb-4">Top States</h2>
					<ul>
						{topStates.map((state, index) => (
							<li key={index}>
								<strong>
									{index + 1}. {state.name} -{" "}
								</strong>
								{state.percentage}% - {state.shipments} shipments - ${state.average} avg
							</li>
						))}
					</ul>
				</div>
				{/* <div id="chartUS" style={{ width: '900px', height: '400px' }}></div> */}
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="zone" />
						<Tooltip />
						<Legend />
						<Bar dataKey="value" fill="#8884d8">
							{data.map((_entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* <div className="flex flex-col md:flex-row justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Top International Countries</h2>
                    <ul>
                        {topCountries.map((country, index) => (
                            <li key={index}>
                                <strong>{index + 1}. {country.name} - </strong>
                                {country.percentage}% - {country.shipments} shipments - ${country.average} avg
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="chartWorld" style={{ width: '900px', height: '400px' }}></div>
            </div> */}
		</div>
	);
};

export default TopRegions;
