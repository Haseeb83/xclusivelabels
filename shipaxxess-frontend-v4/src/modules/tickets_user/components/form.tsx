import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@client/components/ui/select";
import { Input } from "@client/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Tickets } from "@shipaxxess/shipaxxess-zod-v4";
import { Textarea } from "@client/components/ui/textarea";

const TicketForm = ({
	form,
	submit,
	button,
}: {
	form: UseFormReturn<Tickets.ZODSCHEMA>;
	submit: (values: Tickets.ZODSCHEMA) => Promise<void>;
	button: React.JSX.Element;
}) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="label">Label</SelectItem>
									<SelectItem value="payment">Payment</SelectItem>
									<SelectItem value="referral">Referral</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.watch("type") === "label" && (
					<FormField
						control={form.control}
						name="data_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Label ID</FormLabel>
								<FormControl>
									<Input {...field} disabled />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{form.watch("type") === "payment" && (
					<FormField
						control={form.control}
						name="data_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment ID</FormLabel>
								<FormControl>
									<Input {...field} disabled />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea placeholder="Write here" className="resize-none" {...field} />
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

export default TicketForm;
