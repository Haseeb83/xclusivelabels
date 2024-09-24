import { RouteObject } from "react-router-dom";
import WeightsAdminPage from "./pages";
import NewWeightAdminPage from "./pages/new";
import EditWeightAdminPage from "./pages/edit";

const Routes: RouteObject[] = [
	{ path: "weights", element: <WeightsAdminPage /> },
	{ path: "weights/new", element: <NewWeightAdminPage /> },
	{ path: "weights/:uuid", element: <EditWeightAdminPage /> },
];

export default Routes;
