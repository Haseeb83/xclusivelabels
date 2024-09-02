import moment from "moment-timezone";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import { ArrowUpDown, MessagesSquare } from "lucide-react";
import { TicketsSelectModel } from "@db/tickets";
import { app } from "@client/config/app";
import { Link } from "react-router-dom";
import { string } from "zod";

export const ticketsColumns = (timezone: string) =>
	[
		{
			accessorKey: "title",
			header: ({ column }:any) => {
				return (
					<Button
					  className="px-0 whitespace-nowrap"
					  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
			header: ({ column }:any) => {
				return (
					<Button
					  className="px-0 whitespace-nowrap"
					  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					  Ticket Title
					  <ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }:any) => <span className="capitalize">{row.original.type}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "status",
			header: ({ column }:any) => {
				return (
					<Button
					  className="px-0 whitespace-nowrap"
					  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					  Ticket Title
					  <ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }:any) => <Badge>{row.original.status}</Badge>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "created_at",
			header: ({ column }:any) => {
				return (
					<Button
					  className="px-0 whitespace-nowrap"
					  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					  Ticket Title
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
				<div className="flex justify-end pr-12">
					<Link to={`/tickets/${row.original.uuid}`}>
						<Button className="gap-1" variant="outline">
							<MessagesSquare size={16} /> View Message
						</Button>
					</Link>
				</div>
			),
		},
	] as ColumnDef<TicketsSelectModel>[];
