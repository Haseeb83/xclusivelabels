import { TimezoneContext } from "@client/contexts/timezone";
import React from "react";
import { usePaymentsQuery } from "../hooks/usePaymentsQuery";
import useTable from "@client/hooks/useTable";
import { paymentsColumns } from "../data/columns";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Link } from "react-router-dom";
import { Button } from "@client/components/ui/button";
import Breadcrumb from "@client/components/common/breadcrumb";
import { CreditCard } from "lucide-react";
import Loading from "@client/components/common/loading";

const PaymentsUserPage = () => {
	const { timezone } = React.useContext(TimezoneContext);

	const paymentsQuery = usePaymentsQuery();

	const { CardTable, ToggleColumns } = useTable({
		key: "payments",
		columns: paymentsColumns(timezone),
		data: paymentsQuery.data,
		loading: paymentsQuery.isLoading,
		sort: [{ id: "id", desc: true }],

	});

	if (paymentsQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Payments" />
			<div className="px-4 py-8 space-y-8">
				<Title
					title="Payments"
					render={
						<>
							<ToggleColumns />
							<Link to="/payments/new">
								<Button>Add Funds</Button>
							</Link>
						</>
					}
				/>
				<Breadcrumb items={[{ title: "Payments", link: "/payments", icon: <CreditCard size={16} /> }]} />
				<CardTable />
			</div>
		</>
	);
};

export default PaymentsUserPage;
