import {
	ColumnDef,
	SortingState,
	useReactTable,
	VisibilityState,
	getCoreRowModel,
	getSortedRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
	getPaginationRowModel,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getLocalcolumnVisibility } from "@client/lib/utils";
import React from "react";

const CardDataTableComponent = React.lazy(() => import("@client/components/common/table"));
const ToggleColumns = React.lazy(() => import("@client/components/common/filter"));

// Memoize ToggleColumns to avoid unnecessary re-renders
const MemoizedToggleColumns = React.memo(ToggleColumns);

const dt: any = [];
let visCng = 0;

const useTable = <T,>({
	data,
	columns,
	loading,
	sort,
	key,
}: {
	data?: T[];
	columns: ColumnDef<T>[];
	loading: boolean;
	sort?: SortingState;
	key: string;
}) => {
	// State management
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<SortingState>(sort || []);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		() => getLocalcolumnVisibility(`${key}_columns`), // Using an initializer function to avoid unnecessary computation
	);
	useEffect(() => {
		setColumnVisibility(JSON.parse(localStorage.getItem(`${key}_columns`) || "{}") as { [x: string]: boolean });
		visCng = Math.random();
	}, []);
	// Memoize data and columns to prevent unnecessary recalculations
	const rowsData = useMemo(() => data ?? dt, [data]); // Fallback to dt if data is undefined or null
	const columnsData = useMemo(() => columns, [columns]) as any;

	// Initialize the table using useReactTable
	const table = useReactTable({
		data: rowsData,
		columns: columnsData,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	// Memoize the render functions to avoid unnecessary re-renders
	const renderToggleColumns = useCallback(
		() => (
			<MemoizedToggleColumns
				table={table}
				token={key}
				columns={columnsData}
				setColumnVisibility={setColumnVisibility}
			/>
		),
		[key],
	);

	const renderCardTable = useCallback(
		({ className }: { className?: string }) => (
			<CardDataTableComponent isLoading={loading} columnsLength={columns.length} table={table} className={className} />
		),
		[loading, columnVisibility, table, visCng],
	);

	return {
		table,
		ToggleColumns: renderToggleColumns,
		CardTable: renderCardTable,
	};
};

export default useTable;