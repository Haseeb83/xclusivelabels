import { useLoading } from "@client/hooks/useLoading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Card } from "@client/components/ui/card";
import { api } from "@client/lib/api";
import Breadcrumb from "@client/components/common/breadcrumb";
import { MapPin } from "lucide-react";
import AddressForm from "../components/form";
import { Address } from "@shipaxxess/shipaxxess-zod-v4";
import { useNavigate } from "react-router-dom";

const NewAddressUserPage = () => {
	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({
		label: "Save Address",
	});

	const form = useForm<Address.ZODSCHEMA>({
		resolver: zodResolver(Address.ZODSCHEMA),
		defaultValues: {
			city: "",
			company_name: "",
			country: "United States",
			full_name: "",
			state: "NY",
			street_one: "",
			street_two: "",
			zip: "",
			phone: "",
		},
	});

	const submit = async (values: Address.ZODSCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/user/addresses").post(values);
		const res = await req.json<{ success: boolean }>();

		if (res.success) {
			api.showSuccessToast();
			navigate("/addresses");
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	return (
		<>
			<Meta title="Create Ship From Address" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Create Ship From Address" />
				<Breadcrumb
					items={[
						{ title: "Manage Ship From Addresses", link: "/addresses", icon: <MapPin size={16} /> },
						{ title: "Create Ship From Address", link: "/addresses/new" },
					]}
				/>
				<Card className="p-8">
					<AddressForm button={button} form={form} submit={submit} />
				</Card>
			</div>
		</>
	);
};

export default NewAddressUserPage;
