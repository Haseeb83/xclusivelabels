import { RouteObject } from "react-router-dom";
import NoticesComponent from "@client/modules/notices_admin/pages/index";
import SingleNoticesComponent from "@client/modules/notices_admin/pages/single";
const Routes: RouteObject[] = [{ path: "notice", element: <NoticesComponent  /> },{ path: "notice/single", element: <SingleNoticesComponent  /> }];

export default Routes;