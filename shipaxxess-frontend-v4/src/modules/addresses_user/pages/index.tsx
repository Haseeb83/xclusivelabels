import Meta from "@client/components/common/meta";
import { addressesColumns } from "../data/columns";
import useTable from "@client/hooks/useTable";
import { useAddressesQuery } from "../hooks/useAddressesQuery";
import Title from "@client/components/common/title";
import { Button } from "@client/components/ui/button";
import Breadcrumb from "@client/components/common/breadcrumb";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "@client/components/common/loading";

const AddressesUserPage = () => {
	const addressesQuery = useAddressesQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "addresses",
		columns: addressesColumns(),
		data: addressesQuery.data,
		loading: addressesQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	if (addressesQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Manage Ship From Addresses" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Manage Ship From Addresses"
					render={
						<>
							<ToggleColumns />
							<Link to="/addresses/new">
								<Button>Create Ship From Address</Button>
							</Link>
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Manage Ship From Addresses", link: "/addresses", icon: <MapPin size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default AddressesUserPage;
