import { TimezoneContext } from "@client/contexts/timezone";
import React from "react";
import { useWeightsQuery } from "../hooks/useWeightsQuery";
import useTable from "@client/hooks/useTable";
import { weightsColumns } from "../data/columns";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Weight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@client/components/ui/button";

const WeightsAdminPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const weightsQuery = useWeightsQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_weights",
		columns: weightsColumns(timezone),
		data: weightsQuery.data,
		loading: weightsQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	return (
		<>
			<Meta title="Weights" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Weights"
					render={
						<>
							<ToggleColumns />
							<Link to="/admin/weights/new">
								<Button>New Weight</Button>
							</Link>
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Weights", link: "/admin/weights", icon: <Weight size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default WeightsAdminPage;
