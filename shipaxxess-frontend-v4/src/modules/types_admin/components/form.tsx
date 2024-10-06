import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { Type } from "@shipaxxess/shipaxxess-zod-v4";
import React from "react";
import { UseFormReturn } from "react-hook-form";

// Define a TypeScript interface for service data
interface Service {
	name: string;
	token: string;
	provider: string; // Ensure this field exists if you're filtering by it
}

export const TypeForm = ({
	form,
	submit,
	button,
}: {
	form: UseFormReturn<Type.ZODSCHEMA>;
	submit: (value: Type.ZODSCHEMA) => void;
	button: React.JSX.Element;
}) => {
	// Initialize state with Service[] type
	const [services, setServices] = React.useState<Service[]>([]);

	React.useEffect(() => {
		// Fetch the JSON file from the public directory
		fetch("/shipping_services.json")
			.then((response) => response.json())
			.then((data: { services: Service[] }) => setServices(data.services))
			.catch((error) => console.error("Error loading JSON:", error));
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
				<FormField
					control={form.control}
					name="label"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="ups">UPS</SelectItem>
									<SelectItem value="usps">USPS</SelectItem>
									<SelectItem value="fedex">FEDEX</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="value"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Value</FormLabel>
							<Select value={field.value} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{services
										.filter((item) => item.provider.toLowerCase() === form.watch("type").toLowerCase())
										.map((item) => (
											<SelectItem key={item.token} value={item.token}>
												{item.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="unit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit (lb/oz)</FormLabel>
							<FormControl>
								<Input {...field} />
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
