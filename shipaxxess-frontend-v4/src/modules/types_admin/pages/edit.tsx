import { useTypeQuery } from "../hooks/useTypeQuery";
import Loading from "@client/components/common/loading";
import { useForm } from "react-hook-form";
import { Type } from "@shipaxxess/shipaxxess-zod-v4";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Card } from "@client/components/ui/card";
import { TypeForm } from "../components/form";
import { Type as IconType } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTypeAdminPage = () => {
	const params = useParams();

	const navigate = useNavigate();

	const typeQuery = useTypeQuery(params.uuid!);

	const form = useForm<Type.ZODSCHEMA>({
		defaultValues: { label: "", type: "usps", unit: "lb", value: "" },
		resolver: zodResolver(Type.ZODSCHEMA),
	});

	const { button, setIsLoading } = useLoading({ label: "Submit" });

	const submit = async (values: Type.ZODSCHEMA) => {
		if (!typeQuery.data) return;

		setIsLoading(true);

		const req = await api
			.url("/admin/types")
			.useAuth()
			.patch({ ...values, id: typeQuery.data.id });
		const res = await req.json<{ success: boolean }>();

		if (res.success) {
			setIsLoading(false);
			api.showSuccessToast("Type updated successfully");
			navigate("/admin/types");
			return;
		}

		setIsLoading(false);
		api.showErrorToast();
	};

	React.useEffect(() => {
		if (typeQuery.data) {
			form.setValue("label", typeQuery.data.label);
			form.setValue("type", typeQuery.data.type as "usps");
			form.setValue("unit", typeQuery.data.unit as "lb");
			form.setValue("value", typeQuery.data.value);
		}
	}, [form, typeQuery.data]);

	if (typeQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Edit Types" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Edit Types" />
				<Breadcrumb
					items={[
						{ title: "Types", link: "/admin/types", icon: <IconType size={16} /> },
						{ title: "Edit Type", link: `/admin/types/edit?uuid=${params.uuid!}` },
					]}
				/>

				<Card className="p-8">
					<TypeForm form={form} submit={submit} button={button} />
				</Card>
			</div>
		</>
	);
};

export default EditTypeAdminPage;
