import { TimezoneContext } from "@client/contexts/timezone";
import React from "react";
import { useTicketsQuery } from "../hooks/useTicketsQuery";
import { ticketsColumns } from "../data/columns";
import useTable from "@client/hooks/useTable";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Ticket } from "lucide-react";

const TicketsAdminPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const ticketsQuery = useTicketsQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_tickets",
		columns: ticketsColumns(timezone),
		data: ticketsQuery.data,
		loading: ticketsQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});
	return (
		<>
			<Meta title="Tickets" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Tickets"
					render={
						<>
							<ToggleColumns />
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Tickets", link: "/admin/tickets", icon: <Ticket size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default TicketsAdminPage;
