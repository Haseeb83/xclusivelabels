import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_usaLow from '@amcharts/amcharts4-geodata/usaLow';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

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

const TopRegions: React.FC<TopRegionsProps> = ({ topStates, topCountries }) => {
    useEffect(() => {
        // Create a chart instance for US map
        let chartUS = am4core.create('chartUS', am4maps.MapChart);
        chartUS.zoomControl = new am4maps.ZoomControl();
        // create a color set for the heat map


        chartUS.geodata = am4geodata_usaLow;
        chartUS.projection = new am4maps.projections.AlbersUsa();


        let polygonSeriesUS = chartUS.series.push(new am4maps.MapPolygonSeries());
        polygonSeriesUS.useGeodata = true;

        // Configure map polygon series
        let polygonTemplate = polygonSeriesUS.mapPolygons.template;
        polygonTemplate.tooltipText = '{name}: {value}';
        polygonTemplate.fill = am4core.color('#D6D6DA');
        polygonTemplate.stroke = am4core.color('#FFFFFF');


        // Add data for US states
        polygonSeriesUS.data = topStates.map(state => ({
            id: state.name, // ID should match geojson property for each state
            value: state.shipments // Value to show in tooltip
        }));


        // Heat rule to colorize US states based on value
        polygonSeriesUS.heatRules.push({
            property: 'fill',
            target: polygonSeriesUS.mapPolygons.template,
            min: am4core.color('#D6D6DA'),
            max: am4core.color('#FF5733'), // Example color for high values
            logarithmic: true // Use logarithmic scale for colorization

        });

        // Create a chart instance for World map
        let chartWorld = am4core.create('chartWorld', am4maps.MapChart);
        chartWorld.zoomControl = new am4maps.ZoomControl();

        chartWorld.geodata = am4geodata_worldLow;
        chartWorld.projection = new am4maps.projections.EqualEarth();

        let polygonSeriesWorld = chartWorld.series.push(new am4maps.MapPolygonSeries());
        polygonSeriesWorld.useGeodata = true;
        polygonSeriesWorld.mapPolygons.template.fill = am4core.color('#D6D6DA');
        polygonSeriesWorld.mapPolygons.template.stroke = am4core.color('#FFFFFF');

        // Clean up when component unmounts
        return () => {
            chartUS.dispose();
            chartWorld.dispose();
        };
    }, [topStates]); // Re-run effect when topStates changes

    return (
        <div className="flex flex-col gap-y-8 m-10">
            <div className="flex flex-col md:flex-row justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4">Top States</h2>
                    <ul>
                        {topStates.map((state, index) => (
                            <li key={index}>
                                <strong>{index + 1}. {state.name} - </strong>
                                {state.percentage}% - {state.shipments} shipments - ${state.average} avg
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="chartUS" style={{ width: '900px', height: '400px' }}></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
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
            </div>
        </div>
    );
};

export default TopRegions;
