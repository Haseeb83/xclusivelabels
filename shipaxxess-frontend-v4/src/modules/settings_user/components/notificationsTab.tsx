import { TabsContent } from "@client/components/ui/tabs";
import { Separator } from "@client/components/ui/separator";
import { UsersSelectModel } from "@db/users";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import Loading from "@client/components/common/loading";
import { Alert, AlertDescription, AlertTitle } from "@client/components/ui/alert";
import { RocketIcon } from "lucide-react";
import { Switch } from "@client/components/ui/switch";
import { api } from "@client/lib/api";

const SettingsNotificationsTab = ({ query }: { query: UseQueryResult<UsersSelectModel> }) => {
	const [marketing_notify, setMarketingNotify] = React.useState(false);
	const [label_notify, setLabelNotify] = React.useState(false);
	const [topup_notify, setTopupNotify] = React.useState(false);
	const [ticket_notify, setTicketNotify] = React.useState(false);

	const updateNotificationStatus = async (type: string, status: boolean) => {
		const req = await api.url("/user/settings/notifications").post({ type, status });
		const res = await req.json<{ success: boolean }>();

		if (!res.success) {
			api.showErrorToast("Something went wrong, please try again later");
			return;
		}

		api.showSuccessToast("Notification status updated successfully");
	};

	React.useEffect(() => {
		if (query.data) {
			setMarketingNotify(query.data.marketing_email_notify || false);
			setLabelNotify(query.data.labels_email_notify || false);
			setTopupNotify(query.data.topups_email_notify || false);
			setTicketNotify(query.data.tickets_email_notify || false);
		}
	}, [query.data]);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<TabsContent value="notifications" className="space-y-8">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-primary">Notifications</h1>
				<span className="text-base text-muted-foreground">
					We want to stay in touch, but only in ways that you find helpful.
				</span>
			</div>

			<Separator />

			<Alert>
				<RocketIcon className="w-4 h-4" />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>Our email system is up and running, you will receives mails from us</AlertDescription>
			</Alert>

			<div className="flex flex-col gap-4">
				<h2>Email Notifications</h2>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div>
						<h3 className="text-lg font-medium text-primary">Marketing</h3>
						<span className="text-sm text-muted-foreground">
							Send me special money-saving offers for XclusiveLabels.com products.
						</span>
					</div>
					<Switch
						checked={marketing_notify}
						onCheckedChange={(checked) => {
							updateNotificationStatus("marketing_email_notify", checked);

							setMarketingNotify(checked);
						}}
					/>
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div>
						<h3 className="text-lg font-medium text-primary">Labels</h3>

						<span className="text-sm text-muted-foreground">
							Receive emails about labels-related updates and notifications
						</span>
					</div>
					<Switch
						checked={label_notify}
						onCheckedChange={(checked) => {
							updateNotificationStatus("labels_email_notify", checked);
							setLabelNotify(checked);
						}}
					/>
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div>
						<h3 className="text-lg font-medium text-primary">Topups</h3>

						<span className="text-sm text-muted-foreground">
							Receive emails about topups-related updates and notifications
						</span>
					</div>
					<Switch
						checked={topup_notify}
						onCheckedChange={(checked) => {
							updateNotificationStatus("topups_email_notify", checked);
							setTopupNotify(checked);
						}}
					/>
				</div>

				<div className="flex items-center justify-between p-4 border rounded-lg">
					<div>
						<h3 className="text-lg font-medium text-primary">Tickets</h3>

						<span className="text-sm text-muted-foreground">
							Receive emails about tickets-related updates and notifications
						</span>
					</div>
					<Switch
						checked={ticket_notify}
						onCheckedChange={(checked) => {
							updateNotificationStatus("tickets_email_notify", checked);
							setTicketNotify(checked);
						}}
					/>
				</div>
			</div>
		</TabsContent>
	);
};

export default SettingsNotificationsTab;
