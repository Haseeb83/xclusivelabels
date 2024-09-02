import React from "react";
import { useTicketsQuery } from "../hooks/useTicketsQuery";
import useTable from "@client/hooks/useTable";
import { ticketsColumns } from "../data/columns";
import { TimezoneContext } from "@client/contexts/timezone";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Link } from "react-router-dom";
import { Button } from "@client/components/ui/button";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Ticket } from "lucide-react";
import Loading from "@client/components/common/loading";

const TicketsUserPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const ticketsQuery = useTicketsQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "tickets",
		columns: ticketsColumns(timezone),
		data: ticketsQuery.data,
		loading: ticketsQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	if (ticketsQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Tickets" />
			<div className="px-4 py-8 space-y-8">
				<Title
					title="Tickets"
					render={
						<>
							<ToggleColumns />
							<Link to="/tickets/new">
								<Button>New Ticket</Button>
							</Link>
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Tickets", link: "/tickets", icon: <Ticket size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default TicketsUserPage;
