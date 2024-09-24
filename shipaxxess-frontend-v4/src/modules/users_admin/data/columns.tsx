import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import moment from "moment-timezone";
import { numberWithCommas } from "@client/lib/utils";
import { app } from "@client/config/app";
import { UsersSelectModel } from "@db/users";
import { Link } from "react-router-dom";

export const usersColumns = (timezone: string) =>
	[
		{
			accessorKey: "id",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Id
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.index + 1}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "first_name",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Full Name
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<span>
					{row.original.first_name} {row.original.last_name}
				</span>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "email_address",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Email Address
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.getValue("email_address")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "email_verified",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Verified
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.original.email_verified ? "yes" : "no"}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "timezone",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						TimeZone
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>{row.getValue("timezone")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "current_balance",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Current Balance
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>${numberWithCommas(row.original.current_balance)}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "total_spent",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Total Spent
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>${numberWithCommas(row.original.total_spent)}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => {
				return (
					<Button className="px-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Date
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
			cell: ({ row }) => (
				<Link to={`/admin/users/${row.original.uuid}`}>
					<Button>View</Button>
				</Link>
			),
		},
	] as ColumnDef<UsersSelectModel>[];
