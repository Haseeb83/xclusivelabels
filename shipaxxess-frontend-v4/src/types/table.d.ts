import { Table } from "@tanstack/react-table";

export type DataTableProps<T> = {
	columnsLength: number;
	table: Table<T>;
	isLoading?: boolean;
	className?: string;
};

export type DataTableToolbarProps<TData> = {
	table: Table<TData>;
	filterKey: string;
	placeholder?: string;
};
