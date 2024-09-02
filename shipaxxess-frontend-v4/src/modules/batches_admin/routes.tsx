import { RouteObject } from "react-router-dom";
import BatchsAdminPage from "./pages";
import ViewBatchAdminPage from "./pages/view";

const Routes: RouteObject[] = [
	{ path: "batches", element: <BatchsAdminPage /> },
	{ path: "batches/:uuid", element: <ViewBatchAdminPage /> },
];

export default Routes;
