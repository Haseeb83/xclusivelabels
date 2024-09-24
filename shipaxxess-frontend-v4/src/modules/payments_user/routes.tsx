import { RouteObject } from "react-router-dom";
import PaymentsUserPage from "./pages";
import NewPaymentUserPage from "./pages/new";

const Routes: RouteObject[] = [
	{ path: "payments", element: <PaymentsUserPage /> },
	{ path: "payments/new", element: <NewPaymentUserPage /> },
];

export default Routes;
