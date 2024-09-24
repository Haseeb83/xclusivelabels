import { TimezoneContext } from "@client/contexts/timezone";
import React from "react";
import { useBatchesQuery } from "../hooks/useBatchesQuery";
import { batchColumns } from "../data/batches";
import useTable from "@client/hooks/useTable";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Tags } from "lucide-react";
import Loading from "@client/components/common/loading";

const BatchsAdminPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const batchesQuery = useBatchesQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_batches",
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
			<Meta title="Batch History" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Batch History"
					render={
						<>
							<ToggleColumns />
						</>
					}
				/>

				<Breadcrumb items={[{ title: "Batch History", link: "/admin/batches", icon: <Tags size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default BatchsAdminPage;
