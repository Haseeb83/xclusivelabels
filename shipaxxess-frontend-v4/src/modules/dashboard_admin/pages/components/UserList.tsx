import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id} className="border-b py-2">
                    <p>{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
