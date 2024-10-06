import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "@shipaxxess/shipaxxess-zod-v4";
import { Boxes } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import PackageForm from "../components/form";
import { Card } from "@client/components/ui/card";
import Title from "@client/components/common/title";
import React from "react";
import { usePackageQuery } from "../hooks/usePackageQuery";
import Loading from "@client/components/common/loading";

const EditPackageUserPage = () => {
	const params = useParams();
	const navigate = useNavigate();

	const packageQuery = usePackageQuery(params.uuid!);

	const { button, setIsLoading } = useLoading({
		label: "Update Package",
	});

	const form = useForm<Package.ZODSCHEMA>({
		resolver: zodResolver(Package.ZODSCHEMA),
		defaultValues: {
			height: 0,
			length: 0,
			name: "",
			weight: 0,
			width: 0,
			radio: "lb"
		},
	});

	const submit = async (values: Package.ZODSCHEMA) => {
		setIsLoading(true);

		if (!packageQuery.data) return;

		const req = await api.url("/user/packages").patch({ ...values, id: packageQuery.data.id });
		const res = await req.json<{ success: boolean }>();

		if (res.success) {
			api.showSuccessToast();
			navigate("/user/packages");
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	React.useEffect(() => {
		if (packageQuery.data) {
			form.setValue("height", packageQuery.data.height);
			form.setValue("length", packageQuery.data.length);
			form.setValue("name", packageQuery.data.name);
			form.setValue("weight", packageQuery.data.weight);
			form.setValue("width", packageQuery.data.width);
		}
	}, [packageQuery.data, form]);

	if (packageQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Edit Package" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Edit Package" />
				<Breadcrumb
					items={[
						{ title: "Packages", link: "/packages", icon: <Boxes size={16} /> },
						{ title: "Edit Package", link: `/packages/${params.uuid!}` },
					]}
				/>
				<Card className="p-8">
					<PackageForm button={button} form={form} submit={submit} />
				</Card>
			</div>
		</>
	);
};

export default EditPackageUserPage;