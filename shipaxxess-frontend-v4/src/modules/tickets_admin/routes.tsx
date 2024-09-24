import { RouteObject } from "react-router-dom";
import TicketsAdminPage from "./pages";
import ChatAdminPage from "./pages/chat";

const Routes: RouteObject[] = [
	{ path: "tickets", element: <TicketsAdminPage /> },
	{ path: "tickets/:uuid", element: <ChatAdminPage /> },
];

export default Routes;
