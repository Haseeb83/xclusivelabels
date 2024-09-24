import { DatePicker } from "@client/components/common/picker";
import { Button, buttonVariants } from "@client/components/ui/button";
import { Card, CardContent, CardHeader } from "@client/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Label } from "@client/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { Separator } from "@client/components/ui/separator";
import { app } from "@client/config/app";
import { findItemById, numberWithCommas } from "@client/lib/utils";
import { AddressesSelectModel } from "@db/addresses";
import { PackagesSelectModel } from "@db/packages";
import { TypesSelectModel } from "@db/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Labels } from "@shipaxxess/shipaxxess-zod-v4";
import { UseQueryResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { StateCombobox } from "@client/components/common/combobox";
import { toast } from "sonner";
import { v4 } from "uuid";
import React from "react";
import { api } from "@client/lib/api";
import { WeightsSelectModel } from "@db/weights";
import { usePapaParse } from "react-papaparse";
import CSVForm from "./csvform";
import LabelsRecipentsTable from "./recipientsTable";
import { useLoading } from "@client/hooks/useLoading";
import { RadioGroup, RadioGroupItem } from "@client/components/ui/radio-group";
import { Checkbox } from "@client/components/ui/checkbox";

type BatchNewFormProps = {
	addresses: UseQueryResult<AddressesSelectModel[]>;
	packages: UseQueryResult<PackagesSelectModel[]>;
	types: UseQueryResult<TypesSelectModel[]>;
};

type onPlaceSelectedProps = {
	address_components: {
		types: string;
		long_name: string;
		short_name: string;
	}[];
};

const BatchNewForm = ({ addresses, packages, types }: BatchNewFormProps) => {
	const { readString } = usePapaParse();
	const [csvdata, setCsvdata] = React.useState<Record<string, string>[]>([]);
	const [csvdialog, setCsvdialog] = React.useState(false);
	const [csvheaders, setCsvheaders] = React.useState<string[]>([]);

	const [costs, setCosts] = React.useState(0);

	const { button: SubmitBatchButton, setIsLoading } = useLoading({ label: "Confirm & Pay", className: "w-full" });

	const form = useForm<Labels.BATCHZODSCHEMA>({
		defaultValues: {
			batch_uuid: v4(),
			shippingdate: new Date().toISOString(),
			sender: {
				city: "",
				country: "United States",
				full_name: "",
				street_one: "",
				street_two: "",
				state: "",
				zip: "",
				company_name: "",
				phone: "",
			},
			recipient: [
				{
					city: "",
					country: "United States",
					full_name: "",
					street_one: "",
					street_two: "",
					state: "",
					zip: "",
					company_name: "",
					uuid: v4(),
					phone: "",
				},
			],
			package: {
				height: 0,
				length: 0,
				name: "",
				weight: 0,
				width: 0,
			},
			saturday: false,
			signature: false,
			saved_sender: false,
		},
		resolver: zodResolver(Labels.BATCHZODSCHEMA),
	});
	const csvform = useForm<Address.PHONEOPTIONALSCHEMA>({
		defaultValues: {
			name: "",
			full_name: "",
			company_name: "",
			street_one: "",
			street_two: "",
			city: "",
			zip: "",
			state: "",
			country: "United States",
		},
		resolver: zodResolver(Address.PHONEOPTIONALSCHEMA),
	});

	const onSubmit = async (data: Labels.BATCHZODSCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/user/labels/batch").useAuth().post(data);
		const res = await req.json<{ success?: string }>();

		if (res.success) {
			api.showSuccessToast();
			setIsLoading(false);
			setCosts(0);
			form.reset();
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	const onCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files) return;

		const reader = new FileReader();
		reader.readAsText(e.currentTarget.files[0], "UTF-8");

		reader.onload = (evt) => {
			if (!evt.target?.result) return toast.error("Failed to load");

			readString<Record<string, string>>(evt.target.result as string, {
				worker: true,
				header: true,
				skipEmptyLines: true,
				complete: (results) => {
					if (results.errors.length > 0) return toast.error("Failed to load");

					csvform.setValue("name", e.target.files![0].name);
					setCsvheaders(results.meta.fields as string[]);
					setCsvdata(results.data);
					setCsvdialog(true);
				},
			});
		};
	};

	const onCSVSubmit = (values: Address.PHONEOPTIONALSCHEMA) => {
		form.setValue(
			"recipient",
			csvdata.map((item) => ({
				city: item[values.city],
				country: item[values.country!],
				full_name: item[values.full_name],
				street_one: item[values.street_one],
				street_two: item[values.street_two!],
				state: item[values.state],
				zip: item[values.zip],
				company_name: item[values.company_name!],
				uuid: v4(),
				phone: item[values.phone!],
			})),
		);
		form.setValue("name", values.name);

		setCsvdialog(false);

		csvform.reset();
	};

	const onPlaceSelected = (place: onPlaceSelectedProps, type: "sender" | "recipient") => {
		if (type === "sender") {
			return place.address_components.map((components) => {
				switch (components.types[0]) {
					case "route":
						form.setValue("sender.street_one", `${form.getValues("sender.street_one")} ${components.long_name}`);
						break;
					case "street_number":
						form.setValue("sender.street_one", components.long_name);
						break;
					case "locality":
						form.setValue("sender.city", components.long_name);
						break;
					case "administrative_area_level_1":
						form.setValue("sender.state", components.short_name);
						break;
					case "postal_code":
						form.setValue("sender.zip", components.long_name);
						break;
					case "country":
						form.setValue("sender.country", components.long_name);
						break;
					case "postal_code_suffix":
						form.setValue("sender.zip", `${form.getValues("sender.zip")}-${components.long_name}`);
						break;
					default:
						break;
				}
			});
		}

		return place.address_components.map((components) => {
			switch (components.types[0]) {
				case "route":
					form.setValue(
						"recipient.0.street_one",
						`${form.getValues("recipient.0.street_one")} ${components.long_name}`,
					);
					break;
				case "street_number":
					form.setValue("recipient.0.street_one", components.long_name);
					break;
				case "locality":
					form.setValue("recipient.0.city", components.long_name);
					break;
				case "administrative_area_level_1":
					form.setValue("recipient.0.state", components.short_name);
					break;
				case "postal_code":
					form.setValue("recipient.0.zip", components.long_name);
					break;
				case "country":
					form.setValue("recipient.0.country", components.long_name);
					break;
				case "postal_code_suffix":
					form.setValue("recipient.0.zip", `${form.getValues("recipient.0.zip")}-${components.long_name}`);
					break;
				default:
					break;
			}
		});
	};

	React.useMemo(async () => {
		const weight = form.watch("package.weight");
		const type_id = form.watch("type.id");
		const type = form.watch("type.type");

		if (weight === 0) return;

		const req = await api.url("/user/weights").useAuth().post({ weight, type_id, type });
		const res = await req.json<WeightsSelectModel & { type: TypesSelectModel } & { message?: string }>();

		if (res.message) {
			api.showErrorToast();
			return;
		}

		setCosts(res.user_cost);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.watch("package.weight")]);

	React.useEffect(() => {
		if (form.formState.errors) {
			if (form.formState.errors.type) {
				toast.error(`Delivery Type ${form.formState.errors.type.message}`);
			}
			if (form.formState.errors.shippingdate) {
				toast.error(`Shipping Date ${form.formState.errors.shippingdate.message}`);
			}
			if (form.formState.errors.sender) {
				toast.error(`Ship From Required`);
			}
		}
	}, [form.formState.errors]);

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card>
						<CardHeader />
						<CardContent className="space-y-6">
							<div className="grid grid-cols-3 grid-rows-1 gap-6">
								<FormField
									control={form.control}
									name="batch_uuid"
									render={({ field }) => {
										return (
											<FormItem className="hidden">
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>

								<FormField
									control={form.control}
									name="type_select"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Delivery Type</FormLabel>
												<Select
													defaultValue={field.value}
													onValueChange={(id: any) => {
														if (!types.data) return;

														const item = findItemById(types.data, Number(id));
														if (!item) return;

														form.setValue("type.id", item.id);
														form.setValue("type.label", item.label);
														form.setValue("type.unit", item.unit as "oz");
														form.setValue("type.value", item.value);
														form.setValue("type.type", item.type as "usps");

														field.onChange(id);
													}}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose a delivery type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{types.data?.length === 0 && (
															<SelectItem value="0" disabled>
																Not found
															</SelectItem>
														)}
														{types.data?.map((nod) => {
															return (
																<SelectItem key={nod.id} value={nod.id.toString()}>
																	{nod.label}
																</SelectItem>
															);
														})}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										);
									}}
								/>

								<FormField
									control={form.control}
									name="shippingdate"
									render={({ field }) => (
										<FormItem className="hidden">
											<FormLabel>Shipping Date</FormLabel>
											<FormControl>
												<DatePicker field={field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="sender_select"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Ship From</FormLabel>
												<Select
													defaultValue={field.value}
													onValueChange={(id: string) => {
														if (id === "custom") {
															field.onChange(id);
														}

														if (!addresses.data) return;

														const item = findItemById(addresses.data, Number(id));
														if (!item) return;

														form.setValue("sender.full_name", item.full_name);
														form.setValue("sender.company_name", item.company_name || "");
														form.setValue("sender.street_one", item.street_one);
														form.setValue("sender.street_two", item.street_two || "");
														form.setValue("sender.city", item.city);
														form.setValue("sender.zip", item.zip);
														form.setValue("sender.state", item.state);
														form.setValue("sender.country", item.country);
														form.setValue("sender.phone", item.phone_number || "");

														field.onChange(id);
													}}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose an address" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="custom">Don't use saved Ship From Address</SelectItem>
														{addresses.data?.map((nod) => {
															return (
																<SelectItem key={nod.id} value={nod.id.toString()}>
																	{`${nod.full_name}, ${nod.street_one}, ${nod.city}, ${nod.zip}, ${nod.state}`}
																</SelectItem>
															);
														})}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										);
									}}
								/>

								{form.watch("sender_select") === "custom" && (
									<div className="col-start-1 col-end-5 p-6 rounded-lg bg-primary/5">
										<h1 className="mb-4">Ship From</h1>
										<div className="grid grid-cols-4 gap-x-8 ">
											<FormField
												control={form.control}
												name="sender.full_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Name</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="sender.company_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Company<span> (optional)</span>
														</FormLabel>
														<FormControl>
															<Input {...field} autoComplete="on" />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="sender.street_one"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Address</FormLabel>
														<FormControl>
															<Autocomplete
																placeholder=""
																className="border border-[#d9d9d9] border-solid w-full h-10  rounded-lg px-4"
																options={{
																	componentRestrictions: { country: ["us"] },
																	fields: ["address_components", "geometry"],
																	types: ["address"],
																}}
																apiKey={app.mapapi}
																onPlaceSelected={(place) => onPlaceSelected(place, "sender")}
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="sender.street_two"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															Apt / Unit / Suite <span>(optional)</span>
														</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="sender.city"
												render={({ field }) => (
													<FormItem>
														<FormLabel>City</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="sender.zip"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Zip Code</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<div className="mt-2.5">
												<StateCombobox form={form} name="sender.state" title="State" />
											</div>
											<FormField
												control={form.control}
												name="sender.country"
												render={({ field }) => (
													<FormItem className="hidden">
														<FormLabel>Country</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value="United States">United States</SelectItem>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="sender.phone"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Phone Number</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name="saved_sender"
											render={({ field }) => (
												<FormItem className="flex flex-row items-start py-4 space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															defaultChecked={field.value}
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
													<div className="space-y-1 leading-none">
														<FormLabel>Save Ship From Address</FormLabel>
													</div>
												</FormItem>
											)}
										/>
									</div>
								)}
							</div>
							<div className="grid grid-cols-5 grid-rows-1 gap-6">
								<FormField
									control={form.control}
									name="package_select"
									render={({ field }) => {
										return (
											<FormItem>
												<FormLabel>Package</FormLabel>
												<Select
													defaultValue={field.value}
													onValueChange={(id: any) => {
														if (!packages.data) return toast.error("No packages found");

														const item = findItemById(packages.data, Number(id));
														if (!item) return toast.error("No packages found");

														form.setValue("package.id", item.id);
														form.setValue("package.name", item.name);
														form.setValue("package.weight", item.weight);
														form.setValue("package.height", item.height);
														form.setValue("package.width", item.width);
														form.setValue("package.length", item.length);

														field.onChange(id);
													}}
													disabled={form.watch("type.id") ? false : true}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Choose a package" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{packages.data?.length === 0 && (
															<SelectItem value="0" disabled>
																Not found
															</SelectItem>
														)}
														{packages.data?.map((nod) => {
															return (
																<SelectItem key={nod.id} value={nod.id.toString()}>
																	{nod.name}
																</SelectItem>
															);
														})}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
								<FormField
									control={form.control}
									name="package.weight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Weight ({form.watch("type.unit") || "unit"})</FormLabel>
											<FormControl>
												<Input {...field} type="number" disabled={form.watch("type.id") ? false : true} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="package.length"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Length (inch)</FormLabel>
											<FormControl>
												<Input {...field} type="number" disabled={form.watch("type.id") ? false : true} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="package.width"
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Width (inch)</FormLabel>
											<FormControl>
												<Input {...field} type="number" disabled={form.watch("type.id") ? false : true} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="package.height"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Height (inch)</FormLabel>
											<FormControl>
												<Input {...field} type="number" disabled={form.watch("type.id") ? false : true} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{form.watch("type.type") === "ups" && (
									<div className="flex items-center gap-16">
										<FormField
											control={form.control}
											name="saturday"
											render={({ field }) => (
												<FormItem className="space-y-3">
													<FormLabel>Saturday (+$2)</FormLabel>
													<FormControl>
														<RadioGroup
															onValueChange={(value) => {
																field.onChange(value === "true" ? true : false);
															}}
															defaultValue={String(field.value)}
															className="flex gap-4 space-y-1">
															<FormItem className="flex items-center space-x-1 space-y-0">
																<FormControl>
																	<RadioGroupItem value="true" />
																</FormControl>
																<FormLabel className="font-normal">Yes</FormLabel>
															</FormItem>
															<FormItem className="flex items-center space-x-1 space-y-0">
																<FormControl>
																	<RadioGroupItem value="false" />
																</FormControl>
																<FormLabel className="font-normal">No</FormLabel>
															</FormItem>
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="signature"
											render={({ field }) => (
												<FormItem className="space-y-3">
													<FormLabel>Signature (+$2)</FormLabel>
													<FormControl>
														<RadioGroup
															onValueChange={(value) => {
																field.onChange(value === "true" ? true : false);
															}}
															defaultValue={String(field.value)}
															className="flex gap-4 space-y-1">
															<FormItem className="flex items-center space-x-1 space-y-0">
																<FormControl>
																	<RadioGroupItem value="true" />
																</FormControl>
																<FormLabel className="font-normal">Yes</FormLabel>
															</FormItem>
															<FormItem className="flex items-center space-x-1 space-y-0">
																<FormControl>
																	<RadioGroupItem value="false" />
																</FormControl>
																<FormLabel className="font-normal">No</FormLabel>
															</FormItem>
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					<div className="flex items-center justify-center p-4 my-8 border border-dashed rounded-lg shadow">
						<div className="flex items-center gap-6">
							<Input type="file" id="file" className="hidden" onChange={onCSVUpload} />
							<Label
								className={buttonVariants({
									variant: "outline",
									className: "cursor-pointer",
								})}
								htmlFor="file">
								Import from CSV
							</Label>
							<span>--OR--</span>
							<Link to="/stores">
								<Button variant="outline">Import From Store</Button>
							</Link>
						</div>
					</div>

					<div className="flex w-full gap-8">
						<Card className="w-4/6 p-4 ">
							<h1 className="mb-4">Ship To</h1>
							<div className="grid grid-cols-2 grid-rows-4 mb-4 gap-x-6 gap-y-2">
								<FormField
									control={form.control}
									name="recipient.0.uuid"
									render={({ field }) => {
										return (
											<FormItem className="hidden">
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
								<FormField
									control={form.control}
									name="recipient.0.full_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="recipient.0.company_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Company<span> (optional)</span>
											</FormLabel>
											<FormControl>
												<Input {...field} autoComplete="on" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="recipient.0.street_one"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Autocomplete
													placeholder=""
													className="border border-[#d9d9d9] border-solid w-full h-10  rounded-lg px-4"
													options={{
														componentRestrictions: { country: ["us"] },
														fields: ["address_components", "geometry"],
														types: ["address"],
													}}
													apiKey={app.mapapi}
													onPlaceSelected={(place) => onPlaceSelected(place, "recipient")}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="recipient.0.street_two"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Apt / Unit / Suite <span>(optional)</span>
											</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="recipient.0.city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="recipient.0.zip"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Zip Code</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="mt-2.5">
									<StateCombobox form={form} name="recipient.0.state" title="State" />
								</div>
								<FormField
									control={form.control}
									name="recipient.0.country"
									render={({ field }) => (
										<FormItem className="hidden">
											<FormLabel>Country</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="United States">United States</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="recipient.0.phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</Card>
						<div className="w-2/6">
							<Card className="p-6 space-y-2">
								<div className="grid items-center grid-cols-2">
									<h1 className="text-sm text-left text-muted-foreground">Single Label Cost:</h1>
									<p className="text-lg font-normal text-right">${costs.toFixed(2)}</p>
								</div>
								<div className="grid items-center grid-cols-2">
									<h1 className="text-sm text-left text-muted-foreground">Total Recipents :</h1>
									<p className="text-lg font-normal text-right">{form.watch("recipient").length}</p>
								</div>
								{/* <div className="grid items-center grid-cols-2">
								<h1 className="text-sm text-left text-muted-foreground">Coupon :</h1>
								<p className="text-lg font-normal text-right text-green-500">- ${10}</p>
							</div> */}
								<Separator />
								<div className="grid items-center grid-cols-2">
									<h1 className="text-sm text-left text-muted-foreground">You will pay in total :</h1>
									<p className="text-3xl font-semibold text-right text-primary">
										${numberWithCommas(costs * form.watch("recipient").length)}
									</p>
								</div>
								<div className="flex items-center justify-end pt-4">{SubmitBatchButton}</div>
							</Card>
							<div className="py-4 mt-4 bg-white rounded-lg shadow">
								<p className="px-4 text-xs text-justify text-muted-foreground">
									Note: You are responsible for all variable and transactional costs of using the service (including but
									not limited to: postage, fees for carrier services, package insurance, direct and indirect costs of
									third-party service providers and carriers, transaction fees charged directly by Xclusive Labels for
									shipping or other services, or other special services selected. We hold no responsibility for lost,
									stolen, damaged, or undeliverable packages and any other issues with the carrier or delivery that used
									a shipping label provided by Xclusive Labels. You can create a support ticket and we will assist you
									if you do encounter an issue, but please remember we are a label provider and we hold no
									responsibility for any issues after a transaction has been completed on our platform
								</p>
							</div>
						</div>
					</div>
				</form>
			</Form>
			<LabelsRecipentsTable recipients={form.watch("recipient")} />
			<CSVForm
				dialog={csvdialog}
				form={csvform}
				setDialog={setCsvdialog}
				headers={csvheaders}
				setHeaders={setCsvheaders}
				onsubmit={onCSVSubmit}
			/>
		</>
	);
};

export default BatchNewForm;
