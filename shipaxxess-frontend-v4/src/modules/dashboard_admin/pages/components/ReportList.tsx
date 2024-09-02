import React from 'react';

interface Report {
    id: number;
    title: string;
    status: string;
}

interface ReportListProps {
    reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
    return (
        <ul>
            {reports.map(report => (
                <li key={report.id} className="border-b py-2">
                    <p>{report.title}</p>
                    <p className={`text-sm ${report.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>{report.status}</p>
                </li>
            ))}
        </ul>
    );
};

export default ReportList;
