import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@client/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@client/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@client/components/ui/tabs";
import { Separator } from "@client/components/ui/separator";
import { UsersSelectModel } from "@db/users";
import { useLoading } from "@client/hooks/useLoading";
import { Settings } from "@shipaxxess/shipaxxess-zod-v4";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import Loading from "@client/components/common/loading";
import { api } from "@client/lib/api";

const SettingsCouponTab = ({ query }: { query: UseQueryResult<UsersSelectModel> }) => {
	const { button, setIsLoading } = useLoading({ label: "Update Coupon" });

	const form = useForm<Settings.COUPONTAB>({
		resolver: zodResolver(Settings.COUPONTAB),
		defaultValues: {
			coupon_code: "",
		},
	});

	const submit = async (values: Settings.COUPONTAB) => {
		setIsLoading(true);
		const req = await api.url("/user/settings/coupon").useAuth().post(values);
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
			form.setValue("coupon_code", query.data.coupon_code || "");
		}
	}, [form, query.data]);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<TabsContent value="coupons" className="space-y-8">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-primary">Coupons</h1>
				<span className="text-base text-muted-foreground">Update Coupon button to Apply</span>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submit)}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="coupon_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Coupon</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{button}
					</div>
				</form>
			</Form>
		</TabsContent>
	);
};

export default SettingsCouponTab;
