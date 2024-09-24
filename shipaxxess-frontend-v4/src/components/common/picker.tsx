import { Popover, PopoverContent, PopoverTrigger } from "@client/components/ui/popover";
import { useState } from "react";
import { cn } from "@client/lib/utils";
import { DateRange } from "react-day-picker";
import { Button } from "@client/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@client/components/ui/calendar";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export const DateRangePicker = ({ className }: { className?: string }) => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: startOfMonth(new Date()),
		to: endOfMonth(new Date()),
	});

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full lg:w-[300px] justify-start text-left font-normal bg-white",
							!date && "text-muted-foreground",
						)}>
						<CalendarIcon className="w-4 h-4 mr-2" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 mr-4" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const DatePicker = <T extends FieldValues, R extends Path<T>>({
	field,
	placeholder = "Choose the shipping date",
}: {
	field: ControllerRenderProps<T, R>;
	placeholder?: string;
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id="shipping_date"
					variant={"outline"}
					className={cn("w-full justify-start", !field.value && "text-muted-foreground")}>
					<CalendarIcon className="w-4 h-4 mr-2" />
					{field.value ? format(new Date(field.value), "PPP") : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={new Date(field.value)} onSelect={field.onChange} initialFocus />
			</PopoverContent>
		</Popover>
	);
};
