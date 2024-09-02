import { zodResolver } from "@hookform/resolvers/zod";
import { Weights } from "@shipaxxess/shipaxxess-zod-v4";
import { useForm } from "react-hook-form";
import { useTypesQuery } from "../hooks/useTypesQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import Loading from "@client/components/common/loading";
import { useWeightQuery } from "../hooks/useWeightQuery";
import React from "react";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { Card } from "@client/components/ui/card";
import FromComponent from "../components/form";
import { Weight } from "lucide-react";

const EditWeightAdminPage = () => {
	const form = useForm<Weights.CREATESCHEMA>({
		defaultValues: {
			reseller_cost: 0,
			from_weight: 0,
			to_weight: 0,
			user_cost: 0,
		},
		resolver: zodResolver(Weights.CREATESCHEMA),
	});

	const params = useParams();

	const typesQuery = useTypesQuery();
	const weightQuery = useWeightQuery(params.uuid!);

	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({ label: "Update" });

	const submit = async (values: Weights.CREATESCHEMA) => {
		if (!weightQuery.data) return;

		setIsLoading(true);

		const req = await api.url("/admin/weights").patch({ ...values, id: weightQuery.data.id });
		const res = await req.json<{ success: true }>();

		if (res.success) {
			form.reset();
			api.showSuccessToast("Weight updated successfully");
			setIsLoading(false);
			navigate("/admin/weights");
			return;
		}

		setIsLoading(false);
		api.showErrorToast();
	};

	React.useEffect(() => {
		if (weightQuery.data && typesQuery.data) {
			form.setValue("from_weight", weightQuery.data.from_weight);
			form.setValue("to_weight", weightQuery.data.to_weight);
			form.setValue("type_id", weightQuery.data.type_id.toString());
			form.setValue("user_cost", weightQuery.data.user_cost);
			form.setValue("reseller_cost", weightQuery.data.reseller_cost);
		}
	}, [form, typesQuery.data, weightQuery.data]);

	if (typesQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title="Edit Weight" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Edit Weight" />
				<Breadcrumb
					items={[
						{ title: "Weights", link: "/admin/weights", icon: <Weight size={16} /> },
						{ title: "Edit Weight", link: `/admin/weights/${params.uuid!}` },
					]}
				/>
				<Card className="p-8">
					<FromComponent form={form} query={typesQuery} button={button} submit={submit} />
				</Card>
			</div>
		</>
	);
};

export default EditWeightAdminPage;
