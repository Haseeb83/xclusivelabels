import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import { Address } from "@shipaxxess/shipaxxess-zod-v4";
import RecipientEditTableMenu from "../components/recipientEditTableMenu";

export const recipentsColumns: ColumnDef<Address.ONLYPHONEOPTIONALSCHEMA>[] = [
	{
		accessorKey: "index",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					#
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span>{row.index + 1}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "full_name",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Full Name
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("full_name")}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "company_name",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Company Name
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("company_name")}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "street_one",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Street One
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("street_one")}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "street_two",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Street Two
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("street_two")}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "city",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					City
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("city")}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "zip",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Zip
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("zip")}</span>,
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "state",
		header: ({ column }) => {
			return (
				<Button
					className="px-0 whitespace-nowrap"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					State
					<ArrowUpDown className="w-4 h-4 ml-2" />
				</Button>
			);
		},
		enableSorting: true,
		enableHiding: true,
	},
	{
		id: "action",
		enableSorting: false,
		enableHiding: false,
		cell: ({ row }) => <RecipientEditTableMenu row={row} />,
	},
];
