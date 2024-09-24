import { Card } from "@client/components/ui/card";
import { DataTableProps } from "@client/types/table";
import { flexRender } from "@tanstack/react-table";
import {
	Table as MainTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@client/components/ui/table";
import { cn } from "@client/lib/utils";
import { Skeleton } from "@client/components/ui/skeleton";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export const DataTable = <T,>({ columnsLength, table, isLoading, className }: DataTableProps<T>) => {
	return (
		<Card>
			<div className={cn("rounded-lg border", className)}>
				<MainTable>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="py-2 pl-12">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.index} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell className="py-3 pl-12" key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : isLoading ? (
							new Array(1).fill(0).map((mod: number) => {
								return (
									<TableRow key={mod}>
										{new Array(columnsLength).fill(0).map((nod: number, mkey) => {
											return (
												<TableCell key={`${mkey}_${nod}`} className="h-24 text-center">
													<Skeleton className="w-full h-[20px] rounded-lg" />
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell colSpan={columnsLength}>
									<div className="flex items-center justify-center py-16">
										<div className="flex flex-col items-center gap-4">
											<img
												src="/svg/no-results.svg"
												height={200}
												width={200}
												alt="no results"
												style={{ width: 200, height: 200 }}
											/>
											<span className="text-base text-muted-foreground">Nothing Found</span>
										</div>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</MainTable>

				<div className="flex items-center justify-between px-12 py-6">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
						selected.
					</div>
					<div className="flex items-center space-x-6 lg:space-x-8">
						<div className="flex items-center space-x-2">
							<p className="text-sm font-medium">Rows per page</p>
							<Select
								value={`${table.getState().pagination.pageSize}`}
								onValueChange={(value) => {
									table.setPageSize(Number(value));
								}}>
								<SelectTrigger className="h-8 w-[70px]">
									<SelectValue placeholder={table.getState().pagination.pageSize} />
								</SelectTrigger>
								<SelectContent side="top">
									{[10, 20, 30, 40, 50, 100].map((pageSize) => (
										<SelectItem key={pageSize} value={`${pageSize}`}>
											{pageSize}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex w-[100px] items-center justify-center text-sm font-medium">
							Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
						</div>
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								className="w-8 h-8 p-0"
								onClick={() => {
									table.previousPage();
								}}
								disabled={!table.getCanPreviousPage()}>
								<span className="sr-only">Go to previous page</span>
								<ChevronLeftIcon className="w-4 h-4" />
							</Button>
							<Button
								variant="outline"
								className="w-8 h-8 p-0"
								onClick={() => {
									table.nextPage();
								}}
								disabled={!table.getCanNextPage()}>
								<span className="sr-only">Go to next page</span>
								<ChevronRightIcon className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default DataTable;
