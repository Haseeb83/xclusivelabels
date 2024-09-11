import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import moment from "moment-timezone";
import { StoresSelectModel } from "@db/stores";
import { app } from "@client/config/app";
import { Link } from "react-router-dom";

export const storesColumns = (timezone: string) =>
	[
		{
			accessorKey: "store_name",
			header: ({ column }:any) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Store Name
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "type",
			header: ({ column }:any) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Store Type
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "created_at",
			header: ({ column }:any) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Date
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }:any) => (
				<span className="whitespace-nowrap">
					{moment.utc(row.original.created_at).tz(timezone).format(app.time.format)}
				</span>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			id: "action",
			enableSorting: false,
			enableHiding: false,
			cell: ({ row }:any) => (
				<Link to={`/stores/ebay?import_id=${row.original.id}`}>
					<Button>View Orders</Button>
				</Link>
			),
		},
	] as ColumnDef<StoresSelectModel>[];
