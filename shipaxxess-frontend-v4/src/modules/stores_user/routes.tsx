import { RouteObject } from "react-router-dom";
import StoresUserPage from "./pages";
import StoreEbayUserPage from "./pages/ebay";

const Routes: RouteObject[] = [
	{ path: "stores", element: <StoresUserPage /> },
	{ path: "stores/ebay", element: <StoreEbayUserPage /> },
];

export default Routes;
