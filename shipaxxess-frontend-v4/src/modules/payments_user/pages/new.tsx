import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { CreditCard } from "lucide-react";
import NewPaymentForm from "../components/form";
import { Card } from "@client/components/ui/card";
import { useGatewayQuery } from "../hooks/useGatewayQuery";
import Loading from "@client/components/common/loading";

const NewPaymentUserPage = () => {
	const gatewayQuery = useGatewayQuery();

	if (gatewayQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Add Funds" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Add Funds" />
				<Breadcrumb
					items={[
						{ title: "Payments", link: "/user/payments", icon: <CreditCard size={16} /> },
						{ title: "Add Funds", link: "/user/payments/new" },
					]}
				/>

				<Card className="p-8">
					<NewPaymentForm query={gatewayQuery} />
				</Card>
			</div>
		</>
	);
};

export default NewPaymentUserPage;