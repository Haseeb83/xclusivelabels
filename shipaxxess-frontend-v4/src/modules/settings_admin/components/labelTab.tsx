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

const SettingsLabelTab = ({ query }: { query: UseQueryResult<AdminSettingsSelectModel[]> }) => {
	const { button, setIsLoading } = useLoading({ label: "Update Label Api Configuration" });

	const form = useForm<Settings.LABELTAB>({
		resolver: zodResolver(Settings.LABELTAB),
		defaultValues: {
			label_apikey: "",
			label_host: "",
		},
	});

	const submit = async (values: Settings.LABELTAB) => {
		setIsLoading(true);

		const req = await api.url("/admin/settings/label").useAuth().post(values);
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
			const host = query.data.find((item) => item.setting_id === "label_host");
			if (host) {
				form.setValue("label_host", host.setting_value);
			}

			const apikey = query.data.find((item) => item.setting_id === "label_apikey");
			if (apikey) {
				form.setValue("label_apikey", apikey.setting_value);
			}
		}
	}, [form, query.data]);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<TabsContent value="label_api_configuration" className="space-y-8">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-primary">Label Configuration</h1>
				<span className="text-base text-muted-foreground">
					You can change or update your label keys information from here
				</span>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submit)}>
					<div className="flex flex-col gap-4 mb-4">
						<FormField
							control={form.control}
							name="label_apikey"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label Api key</FormLabel>
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
							name="label_host"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label host</FormLabel>
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

export default SettingsLabelTab;
