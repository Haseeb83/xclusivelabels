import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@client/components/ui/select";
import { Weights } from "@shipaxxess/shipaxxess-zod-v4";
import { UseFormReturn } from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";
import { TypesSelectModel } from "@db/types";

const FromComponent = ({
	form,
	query,
	button,
	submit,
}: {
	form: UseFormReturn<Weights.CREATESCHEMA>;
	query: UseQueryResult<TypesSelectModel[]>;
	button: React.JSX.Element;
	submit: (values: Weights.CREATESCHEMA) => void;
}) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
				<FormField
					control={form.control}
					name="type_id"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Delivery Type</FormLabel>
								<Select
									defaultValue={field.value}
									onValueChange={(value: any) => {
										console.log(value);
										field.onChange(value);
									}}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Choose a delivery type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{query.data?.length === 0 && (
											<SelectItem value="0" disabled>
												Not found
											</SelectItem>
										)}
										{query.data?.map((nod) => {
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
					name="from_weight"
					render={({ field }) => (
						<FormItem>
							<FormLabel>From Weight</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="to_weight"
					render={({ field }) => (
						<FormItem>
							<FormLabel>To Weight</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="reseller_cost"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Host Cost</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="user_cost"
					render={({ field }) => (
						<FormItem>
							<FormLabel>User Cost</FormLabel>
							<FormControl>
								<Input {...field} type="number" />
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

export default FromComponent;
