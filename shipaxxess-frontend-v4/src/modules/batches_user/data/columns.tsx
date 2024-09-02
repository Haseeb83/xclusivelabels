import moment from "moment-timezone";
import { ArrowUpDown, Copy } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@client/components/ui/button";
import { BatchsSelectModel } from "@db/batchs";
import { app } from "@client/config/app";
import { Badge } from "@client/components/ui/badge";
import TableMenu from "../components/tableMenu";
import { toast } from "sonner";

export const batchColumns = (timezone: string) =>
	[
		{
			accessorKey: "id",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Batch #
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div
					className="flex items-center cursor-pointer hover:text-blue-500"
					onClick={() => {
						navigator.clipboard.writeText(row.original.uuid);
						toast.success("Copied to clipboard");
					}}>
					<p className="whitespace-nowrap w-[76px] text-ellipsis overflow-hidden">{row.original.uuid}</p>
					<Copy size={14} />
				</div>
			),
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "tracking_number",
			header: ({ column }) => {
				return (
					<Button
						className="px-0 whitespace-nowrap"
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						Tracking Number
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div
					className="flex items-center cursor-pointer hover:text-blue-500"
					onClick={() => {
						if (!row.original.tracking_number) return;
						navigator.clipboard.writeText(row.original.tracking_number);
						toast.success("Copied to clipboard");
					}}>
					{!row.original.status_refund && (
						<>
							<p className="whitespace-nowrap w-[76px] text-ellipsis overflow-hidden">{row.original.tracking_number}</p>
							{row.original.tracking_number && <Copy size={14} />}
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
						Name
						<ArrowUpDown className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<span>{row.original.total_labels === 1 ? row.original.sender_full_name : row.original.name}</span>
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
			cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("type_label")}</span>,
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
				<span className="whitespace-nowrap">
					{row.getValue("package_weight")} {row.original.type_unit}
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
			cell: ({ row }) => <span className="whitespace-nowrap">${row.original.cost_user.toFixed(2)}</span>,
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
			cell: ({ row }) => <Badge>{row.original.status_label}</Badge>,
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
			cell: ({ row }) => <TableMenu row={row} />,
		},
	] as ColumnDef<BatchsSelectModel>[];
