import { RouteObject } from "react-router-dom";
import LandingPage from "./pages";

const Routes: RouteObject[] = [
	{
		path: "/",
		element: <LandingPage />,
	},
];

export default Routes;
