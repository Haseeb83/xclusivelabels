import { RouteObject } from "react-router-dom";
import TypesAdminPage from "./pages";
import NewTypeAdminPage from "./pages/new";
import EditTypeAdminPage from "./pages/edit";

const Routes: RouteObject[] = [
	{ path: "types", element: <TypesAdminPage /> },
	{ path: "types/new", element: <NewTypeAdminPage /> },
	{ path: "types/:uuid", element: <EditTypeAdminPage /> },
];

export default Routes;
