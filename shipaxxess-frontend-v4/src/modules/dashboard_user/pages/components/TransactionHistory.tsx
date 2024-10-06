import React, { useState } from 'react';


import { useTable, useSortBy, Column } from 'react-table';
import { CSVLink } from "react-csv";
import { Button } from "@client/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { JSX } from 'react/jsx-runtime';

import NoResults from '@client/components/common/NoResults';

interface Data {
    transactionId: string;
    date: string;
    total: number;
    amount: number;
    balance: number;
    description: string;
    type: string;
    status: string;
}

interface TransactionHistoryTableProps {
    data: Data[];
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ data }) => {
    const columns: Column<Data>[] = React.useMemo(
        () => [
            // {
            //     Header: 'Date',
            //     accessor: 'date',
            //     Cell: ({ value }: any) => (
            //         <div className=''>
            //             {moment(value).format('dddd, D MMMM YYYY')}
            //         </div>
            //     )
            // },
            {
                Header: 'Amount',
                accessor: 'amount',
                Cell: ({ value }: any) => (
                    <div className='text-center'>
                        ${value}
                    </div>
                )
            },
            {
                Header: 'Balance',
                accessor: 'balance',
                Cell: ({ value }: any) => (
                    <div className='text-center'>
                        ${value}
                    </div>
                )
            },
            {
                Header: 'Type',
                accessor: 'type',
                Cell: ({ value }: any) => (
                    <div className="capitalize text-center">
                        {value}
                    </div>
                )
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }: any) => (
                    <div className={`capitalize text-center px-2 py-1 rounded-full ${value === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        value === 'completed' ? 'bg-green-100 text-green-600' :
                            'bg-red-100 text-red-600'
                        }`}>
                        {value}
                    </div>
                )
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    // Pagination state
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);

    const paginatedData = React.useMemo(() => {
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        return rows.slice(start, end);
    }, [pageIndex, pageSize, rows]);

    const totalPages = Math.ceil(rows.length / pageSize);
    console.log(data);
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Transaction History</h2>
            {
                data.length > 0 && (
                    <div className='py-2 flex items-center justify-between'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <Button variant="secondary">
                            <CSVLink data={data} filename={"transaction-history.csv"} className="">
                                Export Data
                            </CSVLink>
                        </Button>
                    </div>
                )
            }
            <div className="overflow-x-auto">
                <div className="shadow-md rounded-xl">
                    {/* Separate container for the table header to keep it fixed */}
                    <div className="min-w-full border-t-2 border-x-2 border-gray-200 rounded-t-lg">
                        <table {...getTableProps()} className="min-w-full">
                            <thead className="text-gray-900 bg-white sticky top-0 z-10">
                                {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }, _index: number) => (
                                    <tr key={_index} {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column, columnIndex) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className={`py-2 px-3 rounded-md border-gray-300 text-left text-sm font-semibold text-gray-500 uppercase ${columnIndex === 0 ? "rounded-tl-lg" : columnIndex === headerGroup.headers.length - 1 ? "rounded-tr-lg" : ""
                                                    }`}
                                            >
                                                <div className="flex items-center">
                                                    {column.render('Header')}
                                                    <ArrowUpDown className="w-4 h-4 ml-2" />
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                    {/* Scrollable container for the table body */}
                    <div className="max-h-96 h-96 overflow-y-auto border-x-2 border-b-2 rounded-b-lg">
                        {
                            data.length === 0 ? <NoResults /> : (
                                <table {...getTableProps()} className="min-w-full">
                                    <tbody {...getTableBodyProps()} className="text-gray-700 bg-white">
                                        {paginatedData.map((row: { getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()} className="border-b border-gray-200 hover:bg-gray-100">
                                                    {row.cells.map(cell => (
                                                        <td {...cell.getCellProps()} className="py-3 px-4 text-left whitespace-nowrap">
                                                            {cell.render('Cell')}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                        {paginatedData.length < pageSize && (
                                            <tr>
                                                <td colSpan={columns.length} className="py-3 px-4 text-left whitespace-nowrap">
                                                    <div className="h-full"></div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>
                {rows.length > 0 && (
                    <div className="py-2 flex justify-around items-center">
                        <div>
                            <Button variant="outline" disabled={pageIndex === 0} onClick={() => setPageIndex(pageIndex - 1)}>
                                Previous
                            </Button>
                        </div>
                        <div>
                            <span>
                                Page {pageIndex + 1} of {totalPages}
                            </span>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPageIndex(0); // Reset to first page when page size changes
                                }}
                                className="ml-2 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                            >
                                {[10, 20, 50, 100].map((size) => (
                                    <option key={size} value={size}>
                                        Show {size} rows
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Button variant="outline" disabled={pageIndex >= totalPages - 1} onClick={() => setPageIndex(pageIndex + 1)}>
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TransactionHistoryTable;