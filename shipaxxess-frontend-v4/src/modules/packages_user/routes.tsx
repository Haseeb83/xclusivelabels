import { RouteObject } from "react-router-dom";
import PackagesUserPage from "./pages";
import NewPackageUserPage from "./pages/new";
import EditPackageUserPage from "./pages/edit";

const Routes: RouteObject[] = [
	{ path: "packages", element: <PackagesUserPage /> },
	{ path: "packages/new", element: <NewPackageUserPage /> },
	{ path: "packages/:uuid", element: <EditPackageUserPage /> },
];

export default Routes;
