import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { Input } from "@client/components/ui/input";
import { StateCombobox } from "@client/components/common/combobox";
import { UseFormReturn } from "react-hook-form";
import { Address } from "@shipaxxess/shipaxxess-zod-v4";
import { app } from "@client/config/app";
import Autocomplete from "react-google-autocomplete";

type PlaceProps = { address_components: { types: keyof Address.ZODSCHEMA; long_name: string; short_name: string }[] };

const AddressForm = ({
	form,
	submit,
	button,
}: {
	form: UseFormReturn<Address.ZODSCHEMA>;
	submit: (values: Address.ZODSCHEMA) => Promise<void>;
	button: React.JSX.Element;
}) => {
	const onPlaceSelected = (place: PlaceProps) => {
		place.address_components.map((components) => {
			switch (components.types[0]) {
				case "route":
					form.setValue("street_one", `${form.getValues("street_one")} ${components.long_name}`);
					break;
				case "street_number":
					form.setValue("street_one", components.long_name);
					break;
				case "locality":
					form.setValue("city", components.long_name);
					break;
				case "administrative_area_level_1":
					form.setValue("state", components.short_name);
					break;
				case "postal_code":
					form.setValue("zip", components.long_name);
					break;
				case "country":
					form.setValue("country", components.long_name);
					break;
				case "postal_code_suffix":
					form.setValue("zip", `${form.getValues("zip")}-${components.long_name}`);
					break;
				default:
					break;
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
				<FormField
					control={form.control}
					name="full_name"
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
					name="company_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Company <span>(optional)</span>
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
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="street_one"
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
									onPlaceSelected={(place) => onPlaceSelected(place)}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="street_two"
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
					name="city"
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
					name="zip"
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
				<StateCombobox form={form} name="state" title="State" />
				<FormField
					control={form.control}
					name="country"
					render={({ field }) => (
						<FormItem>
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

				{button}
			</form>
		</Form>
	);
};

export default AddressForm;
