import { CalendarIcon, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@client/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { UseQueryResult } from "@tanstack/react-query";
import { TypesSelectModel } from "@db/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@client/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Labels } from "@shipaxxess/shipaxxess-zod-v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const Search = ({
	type,
	typesQuery,
	onSubmit,
}: {
	type?: string | null;
	typesQuery?: UseQueryResult<TypesSelectModel[]>;
	onSubmit: (values: Labels.SEARCHZODSCHEMA) => void;
}) => {
	const form = useForm<Labels.SEARCHZODSCHEMA>({
		defaultValues: {
			name: undefined,
			uuid: undefined,
			weight: undefined,
			search_type: "label",
			delivery_type: undefined,
			from_date: undefined,
			end_date: undefined,
		},
		resolver: zodResolver(Labels.SEARCHZODSCHEMA),
	});

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const submit = async (values: Labels.SEARCHZODSCHEMA) => {
		onSubmit(values);
		// Pass form values to parent component
		setIsDialogOpen(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button size="icon" variant="outline" onClick={() => setIsDialogOpen(true)}>
					<SearchIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Search By</DialogTitle>
					<div className="py-4">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(submit)}>
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="search_type"
										render={({ field }) => {
											return (
												<FormItem>
													<FormLabel>Search type</FormLabel>
													<Select value={field.value} onValueChange={field.onChange}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Search type" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="label">Label</SelectItem>
															<SelectItem value="batch">Batch</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											);
										}}
									/>

									<FormField
										control={form.control}
										name="uuid"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{form.watch("search_type") === "label" ? "Label ID" : "Batch ID"}</FormLabel>
												<FormControl>
													<Input placeholder="375ef169-ec23-445f-9c6e-3f580cc4fcbc" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{type === "order_history" && (
										<>
											<FormField
												control={form.control}
												name="weight"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Weight</FormLabel>
														<FormControl>
															<Input placeholder="Search by weight..." {...field} type="number" />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="weight_unit_query"
												render={({ field }) => (
													<FormItem className="space-y-3">
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={field.value}
																className="flex items-center">
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="lb" />
																	</FormControl>
																	<FormLabel className="m-0 font-normal">lb</FormLabel>
																</FormItem>
																<FormItem className="flex items-center space-x-3 space-y-0">
																	<FormControl>
																		<RadioGroupItem value="oz" />
																	</FormControl>
																	<FormLabel className="m-0 font-normal">oz</FormLabel>
																</FormItem>
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											{typesQuery && (
												<FormField
													control={form.control}
													name="delivery_type"
													render={({ field }) => {
														return (
															<FormItem>
																<FormLabel>Delivery Type</FormLabel>
																<Select value={field.value} onValueChange={field.onChange}>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Search by delivery type" />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		{typesQuery.data?.length === 0 && (
																			<SelectItem value="0" disabled>
																				Not found
																			</SelectItem>
																		)}
																		{typesQuery.data?.map((nod) => {
																			return (
																				<SelectItem key={nod.id} value={nod.label}>
																					{nod.label}
																				</SelectItem>
																			);
																		})}
																		<SelectItem value="undefined">None</SelectItem>
																	</SelectContent>
																</Select>
																<FormMessage />
															</FormItem>
														);
													}}
												/>
											)}

											<FormField
												control={form.control}
												name="status"
												render={({ field }) => {
													return (
														<FormItem>
															<FormLabel>Status</FormLabel>
															<Select value={field.value} onValueChange={field.onChange}>
																<FormControl>
																	<SelectTrigger>
																		<SelectValue placeholder="Search by status" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	<SelectItem value="inqueue">In Queue</SelectItem>
																	<SelectItem value="processing">Processing</SelectItem>
																	<SelectItem value="awaiting">Awaiting</SelectItem>
																	<SelectItem value="inprogress">In Progress</SelectItem>
																	<SelectItem value="delivered">Delivered</SelectItem>
																	<SelectItem value="completed">Complete</SelectItem>
																	<SelectItem value="cancelled">Cancelled</SelectItem>
																	<SelectItem value="undefined">None</SelectItem>
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													);
												}}
											/>
											<FormField
												control={form.control}
												name="from_date"
												render={({ field }) => (
													<FormItem className="flex flex-col">
														<FormLabel>From Date</FormLabel>
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"pl-3 text-left font-normal",
																			!field.value && "text-muted-foreground",
																		)}>
																		{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
																		<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent className="w-full p-0" align="start">
																<Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
															</PopoverContent>
														</Popover>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="end_date"
												render={({ field }) => (
													<FormItem className="flex flex-col">
														<FormLabel>To Date</FormLabel>
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant={"outline"}
																		className={cn(
																			"pl-3 text-left font-normal",
																			!field.value && "text-muted-foreground",
																		)}>
																		{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
																		<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent className="w-full p-0" align="start">
																<Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
															</PopoverContent>
														</Popover>

														<FormMessage />
													</FormItem>
												)}
											/>
										</>
									)}

									<Button className="w-full">Search</Button>
								</div>
							</form>
						</Form>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default Search;