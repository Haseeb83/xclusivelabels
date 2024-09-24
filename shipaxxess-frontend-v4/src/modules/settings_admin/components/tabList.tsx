import { TabsList, TabsTrigger } from "@client/components/ui/tabs";
import { DollarSign, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsTabsList = () => {
	const navigate = useNavigate();

	return (
		<TabsList className="flex flex-col justify-start w-1/5 h-auto p-0 bg-transparent">
			<TabsTrigger
				onClick={() => navigate("?tab=payment_configuration")}
				value="payment_c"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg shadow-none">
				<DollarSign size={16} />
				Payments Configuration
			</TabsTrigger>
			<TabsTrigger
				onClick={() => navigate("?tab=email_configuration")}
				value="email_"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg">
				<Mail size={16} />
				Email Configuration
			</TabsTrigger>
			<TabsTrigger
				onClick={() => navigate("?tab=label_api_configuration")}
				value="label_api_configuration"
				className="flex items-center justify-start w-full gap-2 py-4 rounded-lg">
				<Mail size={16} />
				Label API Configuration
			</TabsTrigger>
		</TabsList>
	);
};

export default SettingsTabsList;
