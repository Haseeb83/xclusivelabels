import { RouteObject } from "react-router-dom";
import BatchsUserPage from "./pages";
import NewBatchUserPage from "./pages/new";
import ViewBatchUserPage from "./pages/view";

const Routes: RouteObject[] = [
	{ path: "orders", element: <BatchsUserPage /> },
	{ path: "orders/new", element: <NewBatchUserPage /> },
	{ path: "orders/:uuid", element: <ViewBatchUserPage /> },
];

export default Routes;
