import { RouteObject } from "react-router-dom";
import TicketsUserPage from "./pages";
import NewTicketUserPage from "./pages/new";
import ViewTicketUserPage from "./pages/view";

const Routes: RouteObject[] = [
	{ path: "tickets", element: <TicketsUserPage /> },
	{ path: "tickets/new", element: <NewTicketUserPage /> },
	{ path: "tickets/:uuid", element: <ViewTicketUserPage /> },
];

export default Routes;
