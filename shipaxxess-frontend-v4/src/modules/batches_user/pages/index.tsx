import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { useBatchesQuery } from "../hooks/useBatchesQuery";
import useTable from "@client/hooks/useTable";
import React, { useContext, useEffect, useState } from "react";
import { TimezoneContext } from "@client/contexts/timezone";
import { batchColumns } from "../data/columns";
import Search from "@client/components/common/search";
import { Tags } from "lucide-react";
import Loading from "@client/components/common/loading";
import { useTypesQuery } from "@client/hooks/useTypes";
import { BatchsSelectModel } from "@db/batchs";

const BatchsUserPage = () => {
	const { timezone } = useContext(TimezoneContext);

	// Fetching data from queries
	const batchesQuery = useBatchesQuery();
	const typesQuery = useTypesQuery();

	// State to manage filtered data
	const [filteredData, setFilteredData] = useState<BatchsSelectModel[]>([]);

	// Hook to initialize table with fetched data
	const { CardTable, ToggleColumns } = useTable({
		key: "batches",
		columns: batchColumns(timezone),
		data: filteredData, // Use the filtered data instead of raw query data
		loading: batchesQuery.isLoading,
		sort: [{ id: "id", desc: true }],
	});
	useEffect(() => {
		// Set filtered data to all batches initially
		if (batchesQuery.data) {
			setFilteredData(batchesQuery.data as BatchsSelectModel[]);
		}
	}, [batchesQuery.data]);
	// Handler to filter data based on search criteria
	const handleSearchSubmit = (filters: any) => {
		if (!batchesQuery.data) return;
		console.log(filters);
		// Filter function
		const filterDeliveries = (deliveries: any, filters: any) => {
			return deliveries.filter((delivery: any) => {
				console.log(filters);
				if (filters?.delivery_type && delivery.type_label !== filters.delivery_type) return false;
				if (filters.uuid && delivery.uuid !== filters.uuid) return false;
				if (filters.weight && delivery.package_weight !== parseInt(filters.weight)) return false;
				if (filters.weight_unit_query && delivery.type_unit !== filters.weight_unit_query) return false;
				if (filters.status && delivery.status_label !== filters.status) return false;
				if (filters.from_date) {
					const fromDate = new Date(filters.from_date);
					const deliveryFromDate = new Date(delivery.created_at.replace(" ", "T")); // Convert "2024-08-28 04:11:35" to "2024-08-28T04:11:35"
					if (deliveryFromDate <= fromDate) return false;
				}
				if (filters.end_date) {
					const endDate = new Date(filters.end_date);
					const [month, day, year] = delivery.shipping_date.split("/"); // Split "08/28/2024" into parts
					const deliveryEndDate = new Date(`${year}-${month}-${day - 1}`); // Convert to "2024-08-28"
					if (deliveryEndDate > endDate) return false;
				}
				return true;
			});
		};
		console.log(batchesQuery.data);
		// Apply filtering
		const filtered = filterDeliveries(batchesQuery.data, filters);
		setFilteredData(filtered);
	};

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
							<Search type="order_history" typesQuery={typesQuery} onSubmit={handleSearchSubmit} />
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