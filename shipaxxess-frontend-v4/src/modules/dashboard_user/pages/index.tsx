import React from 'react';
import GenericLineChart from "./components/DottedLinechart";

import OverviewSection from './components/OverviewSection';
import Title from '@client/components/common/title';
import { Boxes, LayoutDashboardIcon, Share2, Truck, Plane, MailWarning } from 'lucide-react';
import CustomDateRangePicker from '../../../components/common/CustomDatePicker';
import TopRegions from './components/TopRegions';
import TransactionHistory from './components/TransactionHistory';
import ServicePieChart from './components/Services';
import DateBarChart from './components/Zone';
import { UseGet } from '@client/hooks/useGet';

const DashboardStats: React.FC = () => {
	const getRandomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	const queryKey = 'user-dashboard';
		const { data, isLoading } = UseGet([queryKey], '/user/dashboard', {
			params: {
				start: null,
				end: null
			}
		},"");
	const generateUpDownData = (labels: string[]) => {
		const midPoint = Math.floor(labels.length / 2);
		return labels.map((label, index) => {
			let baseValue;
			if (index <= midPoint) {
				baseValue = 200 + ((index / midPoint) * 800); // Increase to peak
			} else {
				baseValue = 200 + ((1 - (index - midPoint) / midPoint) * 800); // Decrease from peak
			}
			const fluctuations = Math.floor(Math.random() * 100) - 50; // Random number between -50 and 50
			const value = baseValue + fluctuations;
			return {
				label,
				value: Math.max(0, value) // Ensure value is not negative
			};
		});
	};

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const totalShipmentsData = generateUpDownData(months);
	const totalPaymentsData = generateUpDownData(months);
	const averageCostData = generateUpDownData(months);
	const topStates = [
		{ name: "Georgia", percentage: 15.53, shipments: 34, average: 3.59 },
		{ name: "California", percentage: 9.13, shipments: 20, average: 3.4 },
		{ name: "Florida", percentage: 8.68, shipments: 19, average: 2.99 },
		{ name: "Texas", percentage: 7.31, shipments: 16, average: 3.0 },
		{ name: "New Jersey", percentage: 6.85, shipments: 15, average: 3.11 },
		{ name: "New York", percentage: 6.4, shipments: 14, average: 3.2 },
		{ name: "Illinois", percentage: 5.94, shipments: 13, average: 3.1 },
		{ name: "North Carolina", percentage: 5.49, shipments: 12, average: 3.0 },
		{ name: "Virginia", percentage: 5.03, shipments: 11, average: 3.1 },
		{ name: "Pennsylvania", percentage: 4.58, shipments: 10, average: 3.2 }

	];

	const topCountries = [
		{ name: "Australia", percentage: 28.13, shipments: 9, average: 16.39 },
		{ name: "United Kingdom", percentage: 28.13, shipments: 9, average: 13.78 },
		{ name: "Germany", percentage: 15.63, shipments: 5, average: 13.78 },
		{ name: "Canada", percentage: 15.63, shipments: 5, average: 11.64 },
		{ name: "Mexico", percentage: 12.5, shipments: 4, average: 11.88 }
	];



	const handleDateChange = (date: any) => {
		console.log(date);
	};

	return (
		<>

			{isLoading ? (
				<div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				</div>
			) :
				<>
					<div className="px-4">
						<div className='flex justify-between'>
							<div className='flex items-center gap-x-1 sticky top-0 '>
								<LayoutDashboardIcon size={24} />
								<Title title="Dashboard" />
							</div>

							<CustomDateRangePicker onDateChange={handleDateChange} />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 flex-1">
							{/* <OverviewSection title="Current Balance" value={getRandomNumber(1000, 10000)} icon={<CreditCard />} /> */}
							<OverviewSection title="Total Spend" value={data?.staticsCard?.totalSpend} />
							<OverviewSection title="Total Refund" value={data?.staticsCard?.totalRefund} />
							<OverviewSection title="Referral Balance" value={data?.staticsCard?.referlBalance} icon={<Share2 />} />
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">

						<div className="col-span-1 h-full">
							<div className='flex flex-col h-full gap-y-6'>
								<OverviewSection title="Total Shipping Cost" value={getRandomNumber(1000, 10000)} linkText={"View Transactions"} />
								<OverviewSection title="Carrier Adjustment" value={-5.9} linkText={"View All Adjustment"} />
								<OverviewSection title="Pending Refund" value={getRandomNumber(1000, 10000)} linkText={"View Refund History"} />
							</div>
						</div>
						<div className="col-span-1 lg:col-span-2">
							<GenericLineChart
								data={totalPaymentsData}
								title="Total Payments"
								valueKey="value"
								icon={<Boxes size={24} />}
								xAxisLink='/payments'
							/>
						</div>
						<div className="col-span-1 lg:col-span-2">

							<GenericLineChart
								data={averageCostData}
								title="Average Cost"
								valueKey="value"
								icon={<Boxes size={24} />}
								height={260}
								xAxisLink='/cost'

							/>

						</div>
						<div className="col-span-1 h-full">
							<div className='flex flex-col h-full mt-4  gap-y-10'>
								<OverviewSection title="Avg. Domestic" value={getRandomNumber(1000, 10000)} linkText={"View Shipments"} icon={<Truck size={24} />} />
								<OverviewSection title="Avg. International" value={getRandomNumber(1000, 10000)} linkText={"View Shipments "} icon={<Plane size={24} />} />

							</div>
						</div>
						<div className="col-span-1 h-full">
							<div className='flex flex-col h-full mt-4  gap-y-10'>
								<OverviewSection title="New Shipments" value={getRandomNumber(1000, 10000)} linkText={"View Shipments"} />
								<OverviewSection title="Delivery Issues" value={getRandomNumber(1000, 10000)} linkText={"View Undeliverable Shipments "} icon={<MailWarning size={24} />} />

							</div>
						</div>
						<div className="col-span-1 lg:col-span-2">
							<GenericLineChart
								data={totalShipmentsData}
								title="Total Shipments"
								valueKey="value"
								icon={<Boxes size={24} />}
								height={280}
								xAxisLink='/shipments'
							/>
						</div>
						<div className='lg:col-span-1  col-span-1'>
							<ServicePieChart />
						</div>
						<div className='lg:col-span-2 col-span-1'>
							<DateBarChart />
						</div>

						<div className="col-span-1 lg:col-span-3">
							<TopRegions topStates={topStates} topCountries={topCountries} />
						</div>
						<div className="col-span-1 lg:col-span-3 pb-10">

							<TransactionHistory data={data?.transcationHistory} />

						</div>


					</div>


				</>

			}


		</>
	);
};

export default DashboardStats;
