import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import moment from "moment-timezone";
import { TypesSelectModel } from "@db/types";
import { app } from "@client/config/app";
import TableMenu from "../components/tableMenu";

export const typesColumns = (timezone: string) =>
	[
		{
			accessorKey: "label",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Label
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "type",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Type
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "unit",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Unit
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.getValue("unit")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "value",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Value
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.getValue("value")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Created At
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{moment.utc(row.original.created_at).tz(timezone).format(app.time.format)}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			id: "action",
			cell: ({ row }) => <TableMenu id={row.original.id} uuid={row.original.uuid} />,
			enableSorting: false,
			enableHiding: false,
		},
	] as ColumnDef<TypesSelectModel>[];
