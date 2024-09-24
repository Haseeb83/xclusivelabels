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
import { useMemo, useState } from "react";
import { getLocalcolumnVisibility } from "@client/lib/utils";
import React from "react";

const CardDataTableComponent = React.lazy(() => import("@client/components/common/table"));
const ToggleColumns = React.lazy(() => import("@client/components/common/filter"));

const dt: any = [];

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
	search?: string;
	sort?: SortingState;
	key: string;
}) => {
	const [rowSelection, setRowSelection] = useState({});
	const [sorting, setSorting] = useState<SortingState>(sort ? sort : []);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(getLocalcolumnVisibility(`${key}_columns`));

	const rowsData = useMemo(() => data, [data]);
	const columnsData = useMemo(() => columns, [columns]);

	const table = useReactTable({
		data: rowsData ? rowsData : dt,
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

	return {
		table,
		// @ts-expect-error will fix later
		ToggleColumns: () => <ToggleColumns table={table} token={key} />,
		CardTable: ({ className }: { className?: string }) => (
			// @ts-expect-error will fix later
			<CardDataTableComponent isLoading={loading} columnsLength={columns.length} table={table} className={className} />
		),
	};
};

export default useTable;
