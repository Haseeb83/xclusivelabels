import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@client/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@client/components/ui/tabs";
import { Separator } from "@client/components/ui/separator";
import { AdminSettingsSelectModel } from "@db/adminSettings";
import { useLoading } from "@client/hooks/useLoading";
import { Settings } from "@shipaxxess/shipaxxess-zod-v4";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import Loading from "@client/components/common/loading";
import { api } from "@client/lib/api";

const SettingsEmailTab = ({ query }: { query: UseQueryResult<AdminSettingsSelectModel[]> }) => {
	const { button, setIsLoading } = useLoading({ label: "Update Email Configuration" });

	const form = useForm<Settings.EMAILTAB>({
		resolver: zodResolver(Settings.EMAILTAB),
		defaultValues: {
			email_from_address: "",
			email_from_name: "",
			email_smtp_host: "",
			email_smtp_password: "",
			email_smtp_port: "587",
			email_smtp_user: "",
		},
	});

	const submit = async (values: Settings.EMAILTAB) => {
		setIsLoading(true);

		const req = await api.url("/admin/settings/email").useAuth().post(values);
		const res = await req.json<{ success: boolean }>();

		if (!res.success) {
			api.showErrorToast();
			setIsLoading(false);
			return;
		}

		api.showSuccessToast();

		setIsLoading(false);
	};

	React.useEffect(() => {
		if (query.data) {
			const apikey = query.data.find((item) => item.setting_id === "email_from_address");
			if (apikey) {
				form.setValue("email_from_address", apikey.setting_value);
			}

			const host = query.data.find((item) => item.setting_id === "email_from_name");
			if (host) {
				form.setValue("email_from_name", host.setting_value);
			}

			const address = query.data.find((item) => item.setting_id === "email_smtp_host");
			if (address) {
				form.setValue("email_smtp_host", address.setting_value);
			}

			const port = query.data.find((item) => item.setting_id === "email_smtp_port");
			if (port) {
				form.setValue("email_smtp_port", port.setting_value);
			}

			const user = query.data.find((item) => item.setting_id === "email_smtp_user");
			if (user) {
				form.setValue("email_smtp_user", user.setting_value);
			}

			const password = query.data.find((item) => item.setting_id === "email_smtp_password");
			if (password) {
				form.setValue("email_smtp_password", password.setting_value);
			}
		}
	}, [form, query.data]);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<TabsContent value="email_configuration" className="space-y-8">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-primary">Email Configuration</h1>
				<span className="text-base text-muted-foreground">
					You can change or update your email keys information from here
				</span>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submit)}>
					<div className="flex flex-col gap-4 mb-4">
						<FormField
							control={form.control}
							name="email_from_address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>From Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email_from_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>From Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email_smtp_host"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Smtp Host</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email_smtp_port"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Smtp Port</FormLabel>
									<FormControl>
										<Input {...field} type="number" />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email_smtp_user"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Smtp User</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email_smtp_password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Smtp Password</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex items-center gap-4">{button}</div>
				</form>
			</Form>
		</TabsContent>
	);
};

export default SettingsEmailTab;
