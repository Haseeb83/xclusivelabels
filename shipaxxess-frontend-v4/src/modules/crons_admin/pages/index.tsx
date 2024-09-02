import { TimezoneContext } from "@client/contexts/timezone";
import React from "react";
import { useCronsQuery } from "../hooks/useCronsQuery";
import useTable from "@client/hooks/useTable";
import { cronsColumns } from "../data/columns";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { CircleDotDashed } from "lucide-react";
import Loading from "@client/components/common/loading";

const CronsAdminPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const cronsQuery = useCronsQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_crons",
		columns: cronsColumns(timezone),
		data: cronsQuery.data,
		loading: cronsQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	if (cronsQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Crons" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Crons"
					render={
						<>
							<ToggleColumns />
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Crons", link: "/crons", icon: <CircleDotDashed size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default CronsAdminPage;
