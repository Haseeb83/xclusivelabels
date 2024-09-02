import Breadcrumb from "@client/components/common/breadcrumb";
import Loading from "@client/components/common/loading";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import useQuery from "@client/hooks/useQuery";
import useTable from "@client/hooks/useTable";
import { api } from "@client/lib/api";
import { EbayFulfillmentResponseProps } from "@client/types/ebay";
import { OrderProps } from "@client/types/order";
import { Store } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ordersColumns } from "../data/orders";
import { TimezoneContext } from "@client/contexts/timezone";

const StoreEbayUserPage = () => {
	const { search } = useLocation();
	const { timezone } = React.useContext(TimezoneContext);

	const query = useQuery();
	const navigate = useNavigate();

	const [isImporting, setIsImporting] = React.useState(true);
	const [orders, setOrder] = React.useState<OrderProps[]>([]);

	const { CardTable, ToggleColumns } = useTable({
		key: "orders",
		columns: ordersColumns(timezone),
		loading: isImporting,
		data: orders,
		sort: [{ id: "id", desc: true }],
	});

	const exchangeCode = async (code: string) => {
		const req = await api.url(`/user/stores/ebay/callback?code=${code}`).useAuth().get();
		const res = await req.json<{ success: boolean; id: number }>();

		if (!res.success) {
			api.showErrorToast();
			return;
		}

		api.showSuccessToast("Successfully connected to eBay!");

		navigate(`/stores/ebay?import_id=${res.id}`);
	};

	const getOders = async (id: string) => {
		const req = await api.url(`/user/stores/ebay/fetch?id=${id}`).useAuth().get();
		const res = await req.json<EbayFulfillmentResponseProps & { message: string }>();

		if (res.message) {
			api.showErrorToast();
			setIsImporting(false);
			return;
		}

		setOrder(
			res.orders.map((order) => ({
				id: order.orderId,
				city: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.city,
				company: order.fulfillmentStartInstructions[0].shippingStep.shipTo.companyName,
				country: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.county,
				full_name: order.fulfillmentStartInstructions[0].shippingStep.shipTo.fullName,
				phone: order.fulfillmentStartInstructions[0].shippingStep.shipTo.primaryPhone.phoneNumber,
				state: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.stateOrProvince,
				street1: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.addressLine1,
				street2: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.addressLine2,
				zip: order.fulfillmentStartInstructions[0].shippingStep.shipTo.contactAddress.postalCode,
				date: order.creationDate,
			})),
		);

		setIsImporting(false);

		api.showSuccessToast("Successfully imported orders!");
	};

	React.useEffect(() => {
		const code = search.match(/\?code=([^&]+)/);
		if (code) {
			exchangeCode(code[1]);
		}

		if (query.get("import_id")) {
			getOders(query.get("import_id")!);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, search]);

	return (
		<>
			<Meta title="Ebay Import Orders" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Ebay Import Orders" render={<ToggleColumns />} />
				<Breadcrumb
					items={[
						{ title: "Stores", link: "/stores", icon: <Store size={16} /> },
						{ title: "Ebay", link: `/stores/ebay?import_id=${query.get("import_id")}` },
					]}
				/>

				{isImporting && <Loading />}

				{!isImporting && <CardTable />}
			</div>
		</>
	);
};

export default StoreEbayUserPage;
