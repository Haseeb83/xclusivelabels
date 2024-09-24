import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import { RefundsSelectModel } from "@db/refunds";
import moment from "moment-timezone";
import { app } from "@client/config/app";
import TableMenu from "../components/tableMenu";
import { Badge } from "@client/components/ui/badge";

export const refundsColumns = (timezone: string) =>
	[
		{
			accessorKey: "id",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Id
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) =>
				row.original.label_uuid ? (
					<>
						<span className="whitespace-nowrap">{row.original.label_uuid}</span>
						<Badge className="ml-2 text-xs">label</Badge>
					</>
				) : (
					<>
						<span className="whitespace-nowrap">{row.original.batch_uuid}</span>
						<Badge className="ml-2 text-xs">batch</Badge>
					</>
				),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "email_address",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Email
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("email_address")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "waiting_for",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Duration
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("waiting_for")} days</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Requested On
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<span className="whitespace-nowrap">
					{moment.utc(row.original.created_at).tz(timezone).format(app.time.format)}
				</span>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			id: "action",
			cell: ({ row }) => <TableMenu row={row} />,
		},
	] as ColumnDef<RefundsSelectModel>[];
