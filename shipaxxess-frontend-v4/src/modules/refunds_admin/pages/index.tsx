import useTable from "@client/hooks/useTable";
import { refundsColumns } from "../data/columns";
import React from "react";
import { TimezoneContext } from "@client/contexts/timezone";
import Loading from "@client/components/common/loading";
import { useRefundsQuery } from "../hooks/useRefundsQuery";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { CircleDollarSign } from "lucide-react";

const RefundAdminPage = () => {
	const addressesQuery = useRefundsQuery();

	const { timezone } = React.useContext(TimezoneContext);

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_refunds",
		columns: refundsColumns(timezone),
		data: addressesQuery.data,
		loading: addressesQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	if (addressesQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Refunds" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Refunds"
					render={
						<>
							<ToggleColumns />
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Refunds", link: "/addresses", icon: <CircleDollarSign size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default RefundAdminPage;
