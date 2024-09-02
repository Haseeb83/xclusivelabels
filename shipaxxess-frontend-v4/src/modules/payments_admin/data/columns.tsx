import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import moment from "moment-timezone";
import { numberWithCommas } from "@client/lib/utils";
import { app } from "@client/config/app";
import { PaymentsSelectModel } from "@db/payments";
import TableMenu from "../components/tableMenu";

export const paymentsColumns = (timezone: string) =>
	[
		{
			accessorKey: "id",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Payment #
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.original.uuid}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "user_name",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Name
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "user_email",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Email
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "gateway",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Gateway
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span className="capitalize">{row.original.gateway}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "current_balance",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Previous Balance
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>${numberWithCommas(row.original.current_balance)}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "credit",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Request Balance
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<>
					{row.original.gateway === "payment" ? (
						<span className="text-red-600">-${numberWithCommas(row.original.credit)}</span>
					) : (
						<span className="text-green-600">+${numberWithCommas(row.original.credit)}</span>
					)}
				</>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "new_balance",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						New Balance
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>${numberWithCommas(row.original.new_balance)}</span>,
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
			cell: ({ row }) => (
				<Badge variant={row.original.status == "rejected" ? "destructive" : "default"}>{row.original.status}</Badge>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Request At
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
			id: "actions",
			cell: ({ row }) => <TableMenu id={row.original.id} status={row.original.status} />,
			enableSorting: false,
			enableHiding: false,
		},
	] as ColumnDef<PaymentsSelectModel>[];
