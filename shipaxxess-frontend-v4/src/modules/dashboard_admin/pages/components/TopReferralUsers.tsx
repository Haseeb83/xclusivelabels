import React, { useState } from 'react';

interface ReferralUser {
    id: number;
    name: string;
    fullName: string;
    email: string;
    timeZone: string;
    referrals: number;
    joined: string;
    status: string;
}

interface Props {
    referralUsersData: ReferralUser[];
}

const TopReferralUsers: React.FC<Props> = ({ referralUsersData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = referralUsersData?.length ? referralUsersData.slice(indexOfFirstUser, indexOfLastUser) : [];

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!referralUsersData || referralUsersData.length === 0) {
        return <div>No Data</div>;
    }
    console.log(referralUsersData);

    return (
        <div className="bg-white w-full md:col-span-2 p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold mb-4">Top Referral Users</h2>
                <ul>
                    {currentUsers.map(user => (
                        <li key={user.id} className="flex justify-between gap-1 items-center border-b border-gray-200 py-2">
                            <span className="text-gray-500">{user.name}</span>
                            <span className="text-gray-500">{user.fullName}</span>
                            <span className="text-gray-500">{user.email}</span>
                            {/* <span className="text-gray-500">{user.timeZone}</span> */}
                            <span className="text-gray-500">{user.referrals} referrals</span>
                            {/* <span className="text-gray-500">{user.joined}</span> */}
                            <span className="text-gray-500">{user.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(referralUsersData.length / usersPerPage)).keys()].map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`h-8 w-8 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-full focus:outline-none`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TopReferralUsers;
