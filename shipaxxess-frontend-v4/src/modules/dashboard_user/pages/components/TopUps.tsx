import React from 'react';

interface TopUp {
    id: number;
    name: string;
}

interface TopUpsProps {
    topUps: TopUp[];
}

const TopUps: React.FC<TopUpsProps> = ({ topUps }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Recent Topups</h3>
            <h2 className="text-sm font-bold mb-4 text-gray-400 border-b-2 border-gray-300 pb-2">Overview</h2>
            <div className="bg-gray-100 p-4 rounded">
                {topUps.map(topUp => (
                    <p key={topUp.id} className="text-gray-600 text-xl font-bold">{topUp.name}</p>
                ))}
            </div>
        </div>
    );
};

export default TopUps;
