import React from 'react';

interface StatisticsCardsProps {
    usersCount: number;
    newUsers: number;
    activeRefunds: number;
    openTickets: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ usersCount, newUsers, activeRefunds, openTickets }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold">Total Users</h3>
                <p className="text-2xl">{usersCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold">New Registered Users</h3>
                <p className="text-2xl">{newUsers}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold">Active Refund Requests</h3>
                <p className="text-2xl">{activeRefunds}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold">Opened Tickets</h3>
                <p className="text-2xl">{openTickets}</p>
            </div>
        </div>
    );
};

export default StatisticsCards;
