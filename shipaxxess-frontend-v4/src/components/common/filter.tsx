import {
	DropdownMenu,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuCheckboxItem,
	DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { TableProperties } from "lucide-react";
import { Button } from "@client/components/ui/button";

const Filter = <TData,>({ table, token }: { table: Table<TData>; token: string }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-10 bg-white">
					<TableProperties className="w-4 h-4 mr-2" />
					Customize Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-auto">
				<DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => {
									if (typeof window !== "undefined") {
										const local = localStorage.getItem(`${token}_columns`);
										if (local) {
											const columns = JSON.parse(local) as {
												[x: string]: boolean;
											};
											localStorage.setItem(`${token}_columns`, JSON.stringify({ ...columns, [column.id]: value }));
										} else {
											localStorage.setItem(`${token}_columns`, JSON.stringify({ [column.id]: value }));
										}
									}

									column.toggleVisibility(!!value);
								}}>
								{column.id.split("_").join(" ")}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Filter;
