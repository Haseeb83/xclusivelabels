import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import { PackagesSelectModel } from "@db/packages";
import TableMenu from "../components/menu";

// Columns
export const packagesColumns = () =>
	[
		{
			accessorKey: "name",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Package Name
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "weight",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Weight
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "length",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Length
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.original.length} inch</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "width",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Width
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.original.width} inch</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "height",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Height
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.original.height} inch</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			id: "action",
			enableSorting: false,
			enableHiding: false,
			cell: ({ row }) => (
				<div className="flex justify-end pr-12">
					<TableMenu row={row} />
				</div>
			),
		},
	] as ColumnDef<PackagesSelectModel>[];
