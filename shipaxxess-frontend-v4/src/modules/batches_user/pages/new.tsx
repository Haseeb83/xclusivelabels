import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { useTypesQuery } from "@client/hooks/useTypes";
import { useAddressesQuery } from "@client/modules/addresses_user/hooks/useAddressesQuery";
import { usePackagesQuery } from "@client/modules/packages_user/hooks/usePackagesQuery";
import { Tags } from "lucide-react";
import BatchNewForm from "../components/form";
import Loading from "@client/components/common/loading";

const NewBatchUserPage = () => {
	const addressesQuery = useAddressesQuery();
	const packagesQuery = usePackagesQuery();
	const typesQuery = useTypesQuery();

	if (addressesQuery.isLoading || packagesQuery.isLoading || typesQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Create a New Label" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Create New Label" />

				<Breadcrumb
					items={[
						{ title: "Order History", link: "/orders", icon: <Tags size={16} /> },
						{ title: "Create New Label", link: "/orders/new" },
					]}
				/>

				<BatchNewForm addresses={addressesQuery} packages={packagesQuery} types={typesQuery} />
			</div>
		</>
	);
};

export default NewBatchUserPage;
