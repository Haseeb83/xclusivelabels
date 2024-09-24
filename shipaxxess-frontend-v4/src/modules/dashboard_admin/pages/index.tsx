import React, { useState } from 'react';
const [] = useState(0);
import moment from 'moment';
import Title from '@client/components/common/title';
import { LayoutDashboardIcon } from 'lucide-react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	Tooltip,
	BarChart,
	Bar,
	Legend,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
} from 'recharts';
import TopShippingCategories from './components/TopShippingCategories';
import PeakOrderTimes from './components/PeakOrderTimes';
import MostPopularStates from './components/MostPopularStates';
import TopReferralUsers from './components/TopReferralUsers';
import PaymentMethodsBreakdown from './components/PaymentMethodsBreakdown';
import Profits from './components/Profits';
import RefundedOrders from './components/RefundedOrders';
import RefundsByCarrier from './components/RefundsByCarrier';
import { UseGet } from '@client/hooks/useGet';
import TransactionHistory from './components/TransactionHistory';

const dateRangeOptions = [
	{ label: 'Custom Range', value: 'custom' },
	{ label: 'Today', value: 'today' },
	{ label: 'Yesterday', value: 'yesterday' },
	{ label: 'Last 7 Days', value: 'last7Days' },
	{ label: 'Current Month', value: 'currentMonth' },
	{ label: 'Last Month', value: 'lastMonth' },
];

const calculateDateRange = (option: string) => {
	let start: moment.Moment | null = null;
	let end: moment.Moment | null = null;

	switch (option) {
		case 'today':
			start = moment().startOf('day');
			end = moment().endOf('day');
			break;
		case 'yesterday':
			start = moment().subtract(1, 'days').startOf('day');
			end = moment().subtract(1, 'days').endOf('day');
			break;
		case 'last7Days':
			start = moment().subtract(6, 'days').startOf('day');
			end = moment().endOf('day');
			break;
		case 'currentMonth':
			start = moment().startOf('month');
			end = moment().endOf('month');
			break;
		case 'lastMonth':
			start = moment().subtract(1, 'month').startOf('month');
			end = moment().subtract(1, 'month').endOf('month');
			break;
		case 'custom':
		default:
			start = null;
			end = null;
	}

	return { start, end };
};

const AdminDashboard: React.FC = () => {
	const queryKey = 'user-dashboard';
		const { data, isLoading } = UseGet([queryKey], '/user/dashboard', {
			params: {
				start: null,
				end: null
			}
		},"");

	const handleDateRangeOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	  const selectedOption = event.target.value;
	  setDateRange(calculateDateRange(selectedOption));
	};

	const COLORS = ['#0088FE', '#00C49F'];
	const CATEGORY_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

	return (
		<>
			{isLoading && (
				<div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				</div>
			)}

			<div className="px-4 py-4 bg-gray-100 min-h-screen">
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center gap-x-2">
						<LayoutDashboardIcon size={24} />
						<Title title="Admin Dashboard" />
					</div>
					<div className="flex items-center gap-x-2">
						<select onChange={handleDateRangeOptionChange} value={dateRangeOptions[0].value}>
							{dateRangeOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
					<div className="bg-white p-4 rounded-lg shadow-md text-center">
						<h3 className="text-lg font-bold">Total Users</h3>
						<p className="text-2xl">{data?.statisticCard?.totalUsers}</p>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-md text-center">
						<h3 className="text-lg font-bold">New Registered Users</h3>
						<p className="text-2xl">{data?.statisticCard?.newlyRegisteredUsers}</p>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-md text-center">
						<h3 className="text-lg font-bold">Active Refund Requests</h3>
						<p className="text-2xl">${data?.statisticCard?.refundsRequests}</p>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-md text-center">
						<h3 className="text-lg font-bold">Opened Tickets</h3>
						<p className="text-2xl">{data?.statisticCard?.openTickets}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div className="bg-white p-4 rounded-lg shadow-md flex">
						<h2 className="text-lg font-bold mb-2">Earnings & Refunds</h2>
						<PieChart width={400} height={400}>
							<Pie
								data={data?.earningRefunds}
								cx={200}
								cy={200}
								labelLine={false}
								label
								outerRadius={120}
								fill="#8884d8"
								dataKey="value"
							>
								{data?.earningRefunds.map((_entry: any, index: number) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</div>

					<div className="bg-white p-4 rounded-lg shadow-md flex">
						<h2 className="text-lg font-bold mb-2">Revenue Breakdown by Category</h2>
						<PieChart width={400} height={400}>
							<Pie
								data={data?.revenueByCategory}
								cx={200}
								cy={200}
								labelLine={false}
								label
								outerRadius={120}
								fill="#8884d8"
								dataKey="value"
							>
								{data?.revenueByCategory.map((_entry: any, index: any) => (
									<Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div className="bg-white p-4 rounded-lg shadow-md">
						<h2 className="text-lg font-bold mb-2">Monthly Revenue Trend</h2>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={data?.monthlyRevenue}>
								<CartesianGrid stroke="#ccc" />
								<XAxis dataKey="month" />
								<Tooltip />
								<Line type="monotone" dataKey="value" stroke="#8884d8" />
							</LineChart>
						</ResponsiveContainer>
					</div>

					<div className="bg-white p-4 col-span-1 rounded-lg shadow-md w-full">
						<h2 className="text-lg font-bold mb-2">Top Selling Products</h2>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart width={1000} height={300} data={data?.topSellingProducts}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<Tooltip />
								<Legend />
								<Bar dataKey="value" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>
						{data?.topSellingProducts.length === 0 && <p>No data available.</p>}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<TopShippingCategories shippingCategoriesData={[]} />
					<PeakOrderTimes peakOrderTimesData={undefined} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<MostPopularStates popularStatesData={[]} />
					<TopReferralUsers referralUsersData={[]} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<PaymentMethodsBreakdown paymentMethodsData={[]} />
					<Profits profitsData={[]} resellerCostData={{}} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<RefundedOrders refundedOrdersData={[]} />
					<RefundsByCarrier refundsByCarrierData={[]} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<TransactionHistory data={[]} />
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
function setDateRange(_arg0: { start: moment.Moment | null; end: moment.Moment | null; }) {
	throw new Error('Function not implemented.');
}

