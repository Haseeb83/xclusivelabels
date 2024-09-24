import Meta from "@client/components/common/meta";
import { useSettingsQuery } from "../hooks/useSettingsQuery";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Settings } from "lucide-react";
import { Tabs } from "@client/components/ui/tabs";
import SettingsTabsList from "../components/tabList";
import SettingsPaymentTab from "../components/paymentTab";
import useQuery from "@client/hooks/useQuery";
import SettingsEmailTab from "../components/emailTab";
import SettingsLabelTab from "../components/labelTab";

const SettingsAdminPage = () => {
	const query = useQuery();

	const settingsQuery = useSettingsQuery();

	return (
		<>
			<Meta title="Settings" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Settings" />
				<Breadcrumb items={[{ title: "Settings", link: "/admin/settings", icon: <Settings size={16} /> }]} />

				<Tabs
					defaultValue="payment_configuration"
					value={query.get("tab") || "payment_configuration"}
					className="flex w-full">
					<SettingsTabsList />
					<div className="w-4/5 p-8 bg-white rounded-lg shadow pr-96">
						<SettingsPaymentTab query={settingsQuery} />
						<SettingsEmailTab query={settingsQuery} />
						<SettingsLabelTab query={settingsQuery} />
					</div>
				</Tabs>
			</div>
		</>
	);
};

export default SettingsAdminPage;
