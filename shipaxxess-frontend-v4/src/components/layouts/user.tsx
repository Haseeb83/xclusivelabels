import { TimezoneContext } from "@client/contexts/timezone";
import { useStatusQuery } from "@client/hooks/useStatusQuery";

import React, { ReactNode } from "react";
import Loading from "../common/loading";
import { app } from "@client/config/app";
import Banner from "../common/banner";
import { adminHeaderItems, headerItems, sidebarItems } from "@client/data/layout";
import Sidebar from "../common/sidebar";
import Header from "../common/header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


const UserLayout = ({ children }: { children?: ReactNode }) => {
	const { setTimezone } = React.useContext(TimezoneContext);

	const navigate = useNavigate();
	const location = useLocation();

	const statusQuery = useStatusQuery("/user/status");

	React.useEffect(() => {
		if (statusQuery.data && statusQuery.data.timezone) {
			setTimezone(statusQuery.data.timezone);
		}
	}, [setTimezone, statusQuery.data]);

	if (statusQuery.isError) {
		navigate("/signin?error=failed_authorization");
	}



	return (
		<>
			{app.mode === "dev" && <Banner />}
			<main className="flex">
				<Sidebar slug={location.pathname} items={sidebarItems} query={statusQuery} />
				<section className="w-[calc(100%-18rem)]">
					<Header items={statusQuery.data?.isadmin ? adminHeaderItems : headerItems} user={statusQuery} />
					<React.Suspense fallback={<Loading className="h-screen" />}>
						{children ? children : <Outlet />}
					</React.Suspense>
				</section>
			</main>
		</>
	);
};

export default UserLayout;
