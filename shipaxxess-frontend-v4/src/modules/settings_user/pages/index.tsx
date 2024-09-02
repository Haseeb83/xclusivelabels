import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Settings } from "lucide-react";
import { useSettingsQuery } from "../hooks/useSettings";
import { Tabs } from "@client/components/ui/tabs";
import useQuery from "@client/hooks/useQuery";
import SettingsTabsList from "../components/tabsList";
import SettingsProfileTab from "../components/profileTab";
import SettingsCouponTab from "../components/settingsTab";
import SettingsNotificationsTab from "../components/notificationsTab";
import SettingsDeleteTab from "../components/deleteTab";

const SettingsUserPage = () => {
	const query = useQuery();

	const settingsQuery = useSettingsQuery();

	return (
		<>
			<Meta title="Settings" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Settings" />
				<Breadcrumb items={[{ title: "Settings", link: "/settings", icon: <Settings size={16} /> }]} />

				<Tabs defaultValue="profile" value={query.get("tab") || "profile"} className="flex w-full">
					<SettingsTabsList />
					<div className="w-4/5 p-8 bg-white rounded-lg shadow pr-96">
						<SettingsProfileTab query={settingsQuery} />
						<SettingsCouponTab query={settingsQuery} />
						<SettingsNotificationsTab query={settingsQuery} />
						<SettingsDeleteTab />
					</div>
				</Tabs>
			</div>
		</>
	);
};

export default SettingsUserPage;
