import { TabsList, TabsTrigger } from "@client/components/ui/tabs";
import { BadgePercent, BellRing, Trash, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsTabsList = () => {
	const navigate = useNavigate();

	return (
		<TabsList className="flex flex-col justify-start w-1/5 h-auto p-0 bg-transparent">
			<TabsTrigger
				onClick={() => navigate("?tab=profile")}
				value="profile"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg shadow-none ring-0">
				<User size={16} /> Profile
			</TabsTrigger>
			<TabsTrigger
				onClick={() => navigate("?tab=coupons")}
				value="coupons"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg shadow-none">
				<BadgePercent size={16} />
				Coupons
			</TabsTrigger>
			<TabsTrigger
				onClick={() => navigate("?tab=notifications")}
				value="notifications"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg">
				<BellRing size={16} />
				Notifications
			</TabsTrigger>
			<TabsTrigger
				onClick={() => navigate("?tab=delete")}
				value="delete"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg">
				<Trash size={16} />
				Delete Account
			</TabsTrigger>
		</TabsList>
	);
};

export default SettingsTabsList;
