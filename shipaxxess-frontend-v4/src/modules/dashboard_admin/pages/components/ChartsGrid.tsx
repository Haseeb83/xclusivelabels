import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    Tooltip,
    BarChart,
    Bar,

} from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];
const CATEGORY_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ChartsGridProps {
    totalEarnings: number;
    activeRefunds: number;
}

const ChartsGrid: React.FC<ChartsGridProps> = ({ totalEarnings, activeRefunds }) => {
    const earningsData = [
        { name: 'Total Earnings', value: totalEarnings },
        { name: 'Refunds', value: activeRefunds },
    ];

    const revenueByCategoryData = [
        { name: 'Category A', value: 400 },
        { name: 'Category B', value: 300 },
        { name: 'Category C', value: 300 },
        { name: 'Category D', value: 200 },
    ];

    const monthlyRevenueData = [
        { month: 'Jan', revenue: 400 },
        { month: 'Feb', revenue: 300 },
        { month: 'Mar', revenue: 200 },
        { month: 'Apr', revenue: 278 },
        { month: 'May', revenue: 189 },
        { month: 'Jun', revenue: 239 },
        { month: 'Jul', revenue: 349 },
        { month: 'Aug', revenue: 200 },
        { month: 'Sep', revenue: 300 },
        { month: 'Oct', revenue: 400 },
        { month: 'Nov', revenue: 500 },
        { month: 'Dec', revenue: 600 },
    ];

    const topSellingProducts = [
        { name: 'Product A', sales: 2400 },
        { name: 'Product B', sales: 4567 },
        { name: 'Product C', sales: 1398 },
        { name: 'Product D', sales: 9800 },
        { name: 'Product E', sales: 3908 },
        { name: 'Product F', sales: 4800 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Earnings & Refunds</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={earningsData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {earningsData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Revenue Breakdown by Category</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={revenueByCategoryData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {revenueByCategoryData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Monthly Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenueData}>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="month" />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2">Top Selling Products</h2>
                <BarChart width={600} height={300} data={topSellingProducts}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

export default ChartsGrid;
