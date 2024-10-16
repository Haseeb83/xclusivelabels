import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ShippingCategory {
    name: string;
    value: number;
}
interface Props {
    shippingCategoriesData: ShippingCategory[];
}




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TopShippingCategories: React.FC<Props> = ({ shippingCategoriesData }) => {
    return (
        <div className="bg-white p-4 md:col-span-2 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Top Shipping Categories</h2>
            {shippingCategoriesData?.length === 0 && <h1 className='mt-32 flex justify-center items-center'>No data available for shipping categories</h1>  }
            {shippingCategoriesData?.length > 0 &&
             <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={shippingCategoriesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={80}
                        label={({ name, value }) => `${name}: ${value}`}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {shippingCategoriesData?.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                     <Legend verticalAlign="bottom" height={15} />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>}
        </div>
    );
};

export default TopShippingCategories;