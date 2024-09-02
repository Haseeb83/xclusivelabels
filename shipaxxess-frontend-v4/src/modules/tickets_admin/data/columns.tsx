import { Badge } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import { app } from "@client/config/app";
import { TicketsInsertModel } from "@db/tickets";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MessagesSquare } from "lucide-react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import TableMenu from "../components/tableMenu";

export const ticketsColumns = (timezone: string) =>
	[
		{
			accessorKey: "title",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Ticket Title
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
			accessorKey: "data_id",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Data Id
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "status",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Status
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <Badge>{row.original.status}</Badge>,
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
			enableSorting: false,
			enableHiding: false,
			cell: ({ row }) => (
				<div className="flex justify-end gap-4 pr-12">
					<Link to={`/admin/tickets/${row.original.uuid}`}>
						<Button variant="outline" className="gap-1">
							<MessagesSquare size={16} /> View Message
						</Button>
					</Link>

					<TableMenu id={row.original.id} status={row.original.status} />
				</div>
			),
		},
	] as ColumnDef<TicketsInsertModel>[];
