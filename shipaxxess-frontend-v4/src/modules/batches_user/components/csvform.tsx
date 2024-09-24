import { DialogWrapperWithForm } from "@client/components/common/dialog";
import { Button } from "@client/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { Address } from "@shipaxxess/shipaxxess-zod-v4";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type CSVFormProps = {
	dialog: boolean;
	setDialog: React.Dispatch<React.SetStateAction<boolean>>;
	form: UseFormReturn<Address.PHONEOPTIONALSCHEMA>;
	headers: string[];
	setHeaders: React.Dispatch<React.SetStateAction<string[]>>;
	onsubmit: (values: Address.PHONEOPTIONALSCHEMA) => void;
};

const CSVForm = ({ dialog, form, setDialog, headers, onsubmit }: CSVFormProps) => {
	React.useEffect(() => {
		if (dialog) {
			for (const header of headers) {
				if (header.toLocaleLowerCase() === "name") {
					form.setValue("full_name", header);
				}
				if (header.toLocaleLowerCase() === "company") {
					form.setValue("company_name", header);
				}
				if (header.toLocaleLowerCase() === "address") {
					form.setValue("street_one", header);
				}
				if (header.toLocaleLowerCase() === "apt/unit/suite") {
					form.setValue("street_two", header);
				}
				if (header.toLocaleLowerCase() === "city") {
					form.setValue("city", header);
				}
				if (header.toLocaleLowerCase() === "state") {
					form.setValue("state", header);
				}
				if (header.toLocaleLowerCase() === "zip") {
					form.setValue("zip", header);
				}
				if (header.toLocaleLowerCase() === "street1") {
					form.setValue("street_one", header);
				}
				if (header.toLocaleLowerCase() === "street2") {
					form.setValue("street_two", header);
				}
				if (header.toLocaleLowerCase() === "phone") {
					form.setValue("phone", header);
				}
			}
		}
	}, [dialog, form, headers]);

	return (
		<DialogWrapperWithForm
			form={form}
			open={dialog}
			setOpen={setDialog}
			title="Assign CSV Fields"
			confirm={<Button type="submit">Import</Button>}
			onsubmit={onsubmit}>
			<>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sheet Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="full_name"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for name" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
					name="company_name"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>
									Campany <span className="text-xs text-muted-foreground">(optional)</span>
								</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for company/reference" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
				<FormField
					control={form.control}
					name="street_one"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for address" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
					name="street_two"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>
									Apt / Unit / Suite <span className="text-xs text-muted-foreground">(optional)</span>
								</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for Apt / Unit / Suite" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>City</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for city" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
				<FormField
					control={form.control}
					name="state"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>State</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for state" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
					name="zip"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Zip Code</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for zip" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
					name="phone"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>
									Phone <span className="text-xs text-muted-foreground">(optional)</span>
								</FormLabel>
								<Select defaultValue={field.value} onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Assign field for phone" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{headers.map((header, index) => {
											return (
												<SelectItem key={index} value={header}>
													{header}
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
			</>
		</DialogWrapperWithForm>
	);
};

export default CSVForm;
