import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { useBatchesQuery } from "../hooks/useBatchesQuery";
import useTable from "@client/hooks/useTable";
import React from "react";
import { TimezoneContext } from "@client/contexts/timezone";
import { batchColumns } from "../data/columns";
import Search from "@client/components/common/search";
import { Tags } from "lucide-react";
import Loading from "@client/components/common/loading";
import { useTypesQuery } from "@client/hooks/useTypes";

const BatchsUserPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const batchesQuery = useBatchesQuery();
	const typesQuery = useTypesQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "batches",
		columns: batchColumns(timezone),
		data: batchesQuery.data,
		loading: batchesQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	if (batchesQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Order History" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Order History"
					render={
						<>
							<Search type="order_history" typesQuery={typesQuery} />
							<ToggleColumns />
						</>
					}
				/>

				<Breadcrumb items={[{ title: "Order History", link: "/orders", icon: <Tags size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default BatchsUserPage;
