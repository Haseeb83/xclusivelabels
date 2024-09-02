import { app } from "@client/config/app";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = ({ title }: { title: string }) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{`${title} - ${app.name}`}</title>
			</Helmet>
		</HelmetProvider>
	);
};

export default Meta;
