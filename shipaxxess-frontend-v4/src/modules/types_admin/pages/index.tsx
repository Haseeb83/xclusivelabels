import { TimezoneContext } from "@client/contexts/timezone";
import React from "react";
import { useTypesQuery } from "../hooks/useTypesQuery";
import useTable from "@client/hooks/useTable";
import { typesColumns } from "../data/columns";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Link } from "react-router-dom";
import { Button } from "@client/components/ui/button";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Type } from "lucide-react";

const TypesAdminPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const typesQuery = useTypesQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_types",
		columns: typesColumns(timezone),
		data: typesQuery.data,
		loading: typesQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	return (
		<>
			<Meta title="Types" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Types"
					render={
						<>
							<ToggleColumns />
							<Link to="/admin/types/new">
								<Button>New Type</Button>
							</Link>
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Types", link: "/admin/types", icon: <Type size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default TypesAdminPage;
