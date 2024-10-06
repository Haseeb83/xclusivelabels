import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface PopularState {
    state: string;
    orders: number;
}
interface Props {
    popularStatesData: PopularState[];
}

const MostPopularStates: React.FC<Props> = ({ popularStatesData }) => {
    return (
        <div className="bg-white p-4 md:col-span-2  rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Most Popular States</h2>
            {popularStatesData?.length < 1 &&
            <div className='text-black text-center my-32'>No data available</div>
            }
           {popularStatesData?.length > 0 && <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularStatesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>}
        </div>
    );
};

export default MostPopularStates;