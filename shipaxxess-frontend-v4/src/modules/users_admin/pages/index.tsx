import { TimezoneContext } from "@client/contexts/timezone";
import useTable from "@client/hooks/useTable";
import React from "react";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { usersColumns } from "../data/columns";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { User } from "lucide-react";
import Search from "@client/components/common/search";
import Loading from "@client/components/common/loading";

const UsersAdminPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const usersQuery = useUsersQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "admin_users",
		columns: usersColumns(timezone),
		data: usersQuery.data,
		loading: usersQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	if (usersQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Users" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Users"
					render={
						<>
							<Search onSubmit={() => {}} />
							<ToggleColumns />
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Users", link: "/admin/users", icon: <User size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default UsersAdminPage;
