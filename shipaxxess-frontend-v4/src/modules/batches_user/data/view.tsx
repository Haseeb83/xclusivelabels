import { ArrowUpDown, CopyIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import moment from "moment-timezone";
import { LabelsSelectModel } from "@db/labels";
import { app } from "@client/config/app";
import ViewTableMenu from "../components/viewTableMenu";

export const labelsColumns = (timezone: string, batch_refund: boolean) =>
	[
		{
			accessorKey: "remote_tracking_number",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Tracking Id
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="flex items-center gap-1 whitespace-nowrap">
					{!batch_refund && (
						<>
							{!row.original.status_refund && (
								<>
									<span id={`copy_${row.index}`}>{row.getValue("remote_tracking_number")}</span>
									{row.original.remote_tracking_number && (
										<CopyIcon size={16} className="cursor-copy" onClick={() => {}} />
									)}
								</>
							)}
						</>
					)}
				</div>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "sender_full_name",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Sender
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("sender_full_name")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "recipent_full_name",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Recipient Name
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("recipent_full_name")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "package_name",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Package
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("package_name")}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "shipping_date",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Ship Date
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<span className="whitespace-nowrap">{moment(row.original.shipping_date).format("DD MMM, YYYY")}</span>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "type_label",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Type
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "package_weight",
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
			cell: ({ row }) => (
				<span>
					{row.original.package_weight} {row.original.type_unit}
				</span>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "cost_user",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Cost
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <span>${row.original.cost_user.toFixed(2)}</span>,
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "status_label",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Status
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => <>{batch_refund ? <Badge>refunded</Badge> : <Badge>{row.original.status_label}</Badge>}</>,
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
						Created At
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
			enableSorting: false,
			enableHiding: false,
			cell: ({ row }) => <ViewTableMenu row={row} batch_refund={batch_refund} />,
		},
	] as ColumnDef<LabelsSelectModel>[];
