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
import { useState, useEffect, useCallback, DragEvent } from "react";

const Filter = <TData,>({
	table,
	token,
	columns,
	setColumnVisibility,
}: {
	table: Table<any>;
	token: string;
	columns: Column<TData>[];
	setColumnVisibility: any;
}) => {
	const [state, setState] = useState<any[]>([]);
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	// Initialize state on component mount
	useEffect(() => {
		const savedColumns = localStorage.getItem(`${token}_columns`);
		if (savedColumns) {
			const savedState = JSON.parse(savedColumns);
			const initialColumns = table.getAllColumns().map((column, i) => ({
				name: column.id,
				id: i,
				isVisible: savedState[column.id] ?? column.getIsVisible(),
			}));
			setState(initialColumns);
		} else {
			// const initialColumns = table.getAllColumns().map((column, i) => ({
			// 	name: column.id,
			// 	id: i,
			// 	isVisible: column.getIsVisible(),
			// }));
			// setState(initialColumns);
		}
	}, []);

	// Update localStorage whenever state changes
	useEffect(() => {
		const savedColumns = state.reduce((acc, col) => {
			acc[col.name] = col.isVisible;
			return acc;
		}, {} as Record<string, boolean>);
		console.log(state);
		localStorage.setItem(`${token}_columns`, JSON.stringify(savedColumns));
		setColumnVisibility(savedColumns);
	}, [state, token]);

	// Update column order when state changes
	const updateColumnOrder = (newState: any[]) => {
		const newOrder = newState.map((col) => col.name);
		table.setColumnOrder(newOrder);
	};

	const handleCheckedChange = useCallback(
		(value: boolean, item: any) => {
			const column = columns.find((col) => col.id === item.name);
			if (column) {
				column.toggleVisibility(value);
			}

			const newState = state.map((col) => (col.name === item.name ? { ...col, isVisible: value } : col));
			console.log(newState);
			setState(newState);

			updateColumnOrder(newState); // Update column order immediately
		},
		[columns, state],
	);

	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};
	const updatedState = [...state];

	const handleDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
		event.preventDefault();
		event.stopPropagation();

		if (draggedIndex !== null) {
			const [movedItem] = updatedState.splice(draggedIndex, 1);
			updatedState.splice(index, 0, movedItem);
			setState(updatedState);
			updateColumnOrder(updatedState); // Update column order after dropping
			setDraggedIndex(null);
		}
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // Necessary to allow dropping
	};
	useEffect(() => {
		// setState(updatedState)
	}, []);

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
				{state.length > 0 ? (
					<div>
						{updatedState.map((item, index) => (
							<DropdownMenuCheckboxItem
								key={item.id}
								className="capitalize"
								checked={item.isVisible}
								onCheckedChange={(value) => handleCheckedChange(value, item)}
								draggable
								onDragStart={() => handleDragStart(index)}
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, index)}>
								{item.name.split("_").join(" ")}
							</DropdownMenuCheckboxItem>
						))}
					</div>
				) : (
					<div>No columns available</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Filter;