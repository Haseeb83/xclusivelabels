import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@client/components/ui/command";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@client/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@client/components/ui/popover";
import { cn } from "@client/lib/utils";
import states from "@client/data/states.json";
import { ChevronsUpDown, Check } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "@client/components/ui/button";
import { ScrollArea } from "@client/components/ui/scroll-area";

interface StateComboboxProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	name: Path<T>;
	title: string;
}

export const StateCombobox = <T extends FieldValues>({ form, name, title }: StateComboboxProps<T>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-col" defaultValue={field.value} onChange={field.onChange} onBlur={field.onBlur}>
					<FormLabel className="capitalize">{title}</FormLabel>
					<Popover>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
									{field.value ? states.find((state) => state.id === field.value)?.name : "Select State"}
									<ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent align="start" className="w-full h-auto max-h-[200px] p-0">
							<Command>
								<CommandInput placeholder="Search States..." />
								<CommandEmpty>No States found.</CommandEmpty>
								<CommandGroup>
									<ScrollArea className="h-[160px] z-30 w-full">
										{states.map((state) => (
											<CommandItem
												key={state.id}
												value={state.name}
												onSelect={() => {
													// @ts-expect-error Don't have the type
													form.setValue(name, state.id);
												}}>
												<Check className={cn("mr-2 h-4 w-4", state.id === field.value ? "opacity-100" : "opacity-0")} />
												{state.name}
											</CommandItem>
										))}
									</ScrollArea>
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
