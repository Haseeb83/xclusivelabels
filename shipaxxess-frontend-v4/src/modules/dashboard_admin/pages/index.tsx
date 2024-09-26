import Title from "@client/components/common/title";
import { UseGet } from "@client/hooks/useGet";
import { LayoutDashboardIcon } from "lucide-react";
import moment from "moment";
import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from "recharts";
import MostPopularStates from "./components/MostPopularStates";
import PaymentMethodsBreakdown from "./components/PaymentMethodsBreakdown";
import PeakOrderTimes from "./components/PeakOrderTimes";
import Profits from "./components/Profits";
import RefundedOrders from "./components/RefundedOrders";
import RefundsByCarrier from "./components/RefundsByCarrier";
import TopReferralUsers from "./components/TopReferralUsers";
import TopShippingCategories from "./components/TopShippingCategories";
import TransactionHistory from "./components/TransactionHistory";

const dateRangeOptions = [
	{ label: "Custom Range", value: "custom" },
	{ label: "Today", value: "today" },
	{ label: "Yesterday", value: "yesterday" },
	{ label: "Last 7 Days", value: "last7Days" },
	{ label: "Current Month", value: "currentMonth" },
	{ label: "Last Month", value: "lastMonth" },
];

const calculateDateRange = (option: string) => {
	let start: moment.Moment | null = null;
	let end: moment.Moment | null = null;

	switch (option) {
		case "today":
			start = moment().startOf("day");
			end = moment().endOf("day");
			break;
		case "yesterday":
			start = moment().subtract(1, "days").startOf("day");
			end = moment().subtract(1, "days").endOf("day");
			break;
		case "last7Days":
			start = moment().subtract(6, "days").startOf("day");
			end = moment().endOf("day");
			break;
		case "currentMonth":
			start = moment().startOf("month");
			end = moment().endOf("month");
			break;
		case "lastMonth":
			start = moment().subtract(1, "month").startOf("month");
			end = moment().subtract(1, "month").endOf("month");
			break;
		case "custom":
		default:
			start = null;
			end = null;
	}

	return { start, end };
};

const AdminDashboard: React.FC = () => {
	const queryKey = "user-dashboard";
	const { data, isLoading } = UseGet(
		[queryKey],
		"/user/dashboard",
		{
			params: {
				start: null,
				end: null,
			},
		},
		"",
	);

	const handleDateRangeOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = event.target.value;
		setDateRange(calculateDateRange(selectedOption));
	};

	const COLORS = ["#0088FE", "#00C49F"];
	const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	return (
		<>
			{isLoading && (
				<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
					<div className="w-32 h-32 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
				</div>
			)}

			<div className="min-h-screen px-4 py-4 bg-gray-100">
				<div className="flex items-center justify-between mb-4">
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

				<div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-4">
					<div className="p-4 text-center bg-white rounded-lg shadow-md">
						<h3 className="text-lg font-bold">Total Users</h3>
						<p className="text-2xl">{data?.statisticCard?.totalUsers}</p>
					</div>
					<div className="p-4 text-center bg-white rounded-lg shadow-md">
						<h3 className="text-lg font-bold">New Registered Users</h3>
						<p className="text-2xl">{data?.statisticCard?.newlyRegisteredUsers}</p>
					</div>
					<div className="p-4 text-center bg-white rounded-lg shadow-md">
						<h3 className="text-lg font-bold">Active Refund Requests</h3>
						<p className="text-2xl">${data?.statisticCard?.refundsRequests}</p>
					</div>
					<div className="p-4 text-center bg-white rounded-lg shadow-md">
						<h3 className="text-lg font-bold">Opened Tickets</h3>
						<p className="text-2xl">{data?.statisticCard?.openTickets}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<div className="flex p-4 bg-white rounded-lg shadow-md">
						<h2 className="mb-2 text-lg font-bold">Earnings & Refunds</h2>
						<PieChart width={400} height={400}>
							<Pie
								data={data?.earningRefunds}
								cx={200}
								cy={200}
								labelLine={false}
								label
								outerRadius={120}
								fill="#8884d8"
								dataKey="value">
								{data?.earningRefunds.map((_entry: any, index: number) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</div>

					<div className="flex p-4 bg-white rounded-lg shadow-md">
						<h2 className="mb-2 text-lg font-bold">Revenue Breakdown by Category</h2>
						<PieChart width={400} height={400}>
							<Pie
								data={data?.revenueByCategory}
								cx={200}
								cy={200}
								labelLine={false}
								label
								outerRadius={120}
								fill="#8884d8"
								dataKey="value">
								{data?.revenueByCategory.map((_entry: any, index: any) => (
									<Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<div className="p-4 bg-white rounded-lg shadow-md">
						<h2 className="mb-2 text-lg font-bold">Monthly Revenue Trend</h2>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={data?.monthlyRevenue}>
								<CartesianGrid stroke="#ccc" />
								<XAxis dataKey="month" />
								<Tooltip />
								<Line type="monotone" dataKey="value" stroke="#8884d8" />
							</LineChart>
						</ResponsiveContainer>
					</div>

					<div className="w-full col-span-1 p-4 bg-white rounded-lg shadow-md">
						<h2 className="mb-2 text-lg font-bold">Top Selling Products</h2>
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

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<TopShippingCategories shippingCategoriesData={[]} />
					<PeakOrderTimes peakOrderTimesData={undefined} />
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<MostPopularStates popularStatesData={[]} />
					<TopReferralUsers referralUsersData={[]} />
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<PaymentMethodsBreakdown paymentMethodsData={[]} />
					<Profits profitsData={[]} resellerCostData={{}} />
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<RefundedOrders refundedOrdersData={[]} />
					<RefundsByCarrier refundsByCarrierData={[]} />
				</div>

				<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
					<TransactionHistory data={[]} />
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
function setDateRange(_arg0: { start: moment.Moment | null; end: moment.Moment | null }) {
	// Not implemented
	return _arg0;
}
