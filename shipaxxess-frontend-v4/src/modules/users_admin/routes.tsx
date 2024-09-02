import { RouteObject } from "react-router-dom";
import UsersAdminPage from "./pages";
import ViewUserAdminPage from "./pages/view";

const Routes: RouteObject[] = [
	{ path: "users", element: <UsersAdminPage /> },
	{ path: "users/:uuid", element: <ViewUserAdminPage /> },
];

export default Routes;
