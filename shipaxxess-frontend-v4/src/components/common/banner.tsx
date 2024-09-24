import { Badge } from "@client/components/ui/badge";
import { app } from "@client/config/app";

const Banner = () => {
	return (
		<>
			<div className="flex z-50 bg-blue-800 items-center justify-center py-1.5 gap-2 h-9 fixed top-0 left-0 right-0">
				<span className="text-white text-sm">You are currently viewing the development preview</span>
				<Badge className="bg-transparent text-white" variant="outline">
					{app.version}
				</Badge>
			</div>
			<div className="h-9"></div>
		</>
	);
};

export default Banner;
