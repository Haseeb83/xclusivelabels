import { RouteObject } from "react-router-dom";
import AddressesUserPage from "./pages";
import EditAddressPage from "./pages/edit";
import NewAddressUserPage from "./pages/new";

const Routes: RouteObject[] = [
	{
		path: "addresses",
		element: <AddressesUserPage />,
	},
	{
		path: "addresses/new",
		element: <NewAddressUserPage />,
	},
	{
		path: "addresses/:uuid",
		element: <EditAddressPage />,
	},
];

export default Routes;
