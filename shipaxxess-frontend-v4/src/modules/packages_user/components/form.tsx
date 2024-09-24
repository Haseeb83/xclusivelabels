import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Package } from "@shipaxxess/shipaxxess-zod-v4";
import { RadioGroup, RadioGroupItem } from "@client/components/ui/radio-group";

const PackageForm = ({
	form,
	submit,
	button,
}: {
	form: UseFormReturn<Package.ZODSCHEMA>;
	submit: (values: Package.ZODSCHEMA) => Promise<void>;
	button: React.JSX.Element;
}) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Saved Package Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="weight"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Weight</FormLabel>
							<FormControl>
								<Input {...field} type="number" onChange={(event) => field.onChange(+event.target.value)} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="radio"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex items-center gap-4">
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="lb" />
										</FormControl>
										<FormLabel className="font-normal ">lb</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="oz" />
										</FormControl>
										<FormLabel className="font-normal">oz</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="length"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Length (inch)</FormLabel>
							<FormControl>
								<Input {...field} type="number" onChange={(event) => field.onChange(+event.target.value)} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="width"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Width (inch)</FormLabel>
							<FormControl>
								<Input {...field} type="number" onChange={(event) => field.onChange(+event.target.value)} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="height"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Height (inch)</FormLabel>
							<FormControl>
								<Input {...field} type="number" onChange={(event) => field.onChange(+event.target.value)} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{button}
			</form>
		</Form>
	);
};

export default PackageForm;
