import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { UsersSelectModel } from "@db/users";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

type WithoutNullableKeys<Type> = {
	[Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>;
};

const FormComponent = ({ query }: { query: UseQueryResult<UsersSelectModel> }) => {
	const form = useForm<WithoutNullableKeys<UsersSelectModel>>();

	const { button, setIsLoading } = useLoading({ label: "Update User" });

	React.useEffect(() => {
		form.setValue("id", query.data?.id || 0);
		form.setValue("first_name", query.data?.first_name || "");
		form.setValue("last_name", query.data?.last_name || "");
		form.setValue("email_address", query.data?.email_address || "");
		form.setValue("coupon_code", query.data?.coupon_code || "");
		form.setValue("current_balance", query.data?.current_balance || 0);
		form.setValue("total_spent", query.data?.total_spent || 0);
		form.setValue("total_refund", query.data?.total_refund || 0);
		form.setValue("total_labels", query.data?.total_labels || 0);
		form.setValue("credit_for_refer_from_user", query.data?.credit_for_refer_from_user || 0);
	}, [form, query.data]);

	const submit = async (data: UsersSelectModel) => {
		setIsLoading(true);

		const req = await api.url(`/admin/users`).useAuth().patch(data);
		const res = await req.json<{ success: boolean }>();

		if (!res.success) {
			api.showErrorToast();
			setIsLoading(false);
			return;
		}

		api.showSuccessToast("User updated successfully");
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-4">
				<FormField
					control={form.control}
					name="first_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name </FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="last_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name </FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email_address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email </FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="coupon_code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Coupon Code </FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="current_balance"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Balance</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="total_spent"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Total Spent</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="total_refund"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Total Refund</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="total_labels"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Total Labels</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="credit_for_refer_from_user"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Credit For Refer From User</FormLabel>
							<FormControl>
								<Input {...field} autoComplete="on" />
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

export default FormComponent;
