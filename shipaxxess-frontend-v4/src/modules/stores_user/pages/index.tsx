import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { TimezoneContext } from "@client/contexts/timezone";
import { Store } from "lucide-react";
import React from "react";
import { useStoresQuery } from "../hooks/useStoresQuery";
import useTable from "@client/hooks/useTable";
import { storesColumns } from "../data/columns";
import { DropdownWrapper } from "@client/components/common/dropdown";
import { Button } from "@client/components/ui/button";
import { api } from "@client/lib/api";

const StoresUserPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const storesQuery = useStoresQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "stores",
		columns: storesColumns(timezone),
		data: storesQuery.data,
		loading: storesQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});

	const ebayOpen = async () => {
		const req = await api.url("/user/stores/ebay/init").useAuth().get();
		const res = await req.json<{ url: string }>();

		if (!res.url) {
			api.showErrorToast();
			return;
		}

		window.open(res.url, "_blank");
	};

	return (
		<>
			<Meta title="Stores" />

			<div className="px-4 py-8 space-y-8">
				<Title
					title="Stores"
					render={
						<>
							<ToggleColumns />
							<DropdownWrapper
								items={[
									<Button variant="ghost" className="w-full" onClick={ebayOpen}>
										Ebay
									</Button>,
								]}
								className="">
								<Button>Connect Store</Button>
							</DropdownWrapper>
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Stores", link: "/stores", icon: <Store size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default StoresUserPage;
