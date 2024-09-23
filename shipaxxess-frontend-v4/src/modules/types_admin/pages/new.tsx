import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Card } from "@client/components/ui/card";
import { Type } from "@shipaxxess/shipaxxess-zod-v4";
import { Type as IconType } from "lucide-react";
import { useForm } from "react-hook-form";
import { TypeForm } from "../components/form";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const NewTypeAdminPage = () => {
	const form = useForm<Type.CREATESCHEMA>({
		defaultValues: { label: "", type: "usps", unit: "lb", value: "" },
		resolver: zodResolver(Type.CREATESCHEMA),
	});

	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({ label: "Submit" });

	const submit = async (values: Type.CREATESCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/admin/types").useAuth().post(values);
		const res = await req.json<{ success: boolean }>();

		if (res.success) {
			form.reset();
			setIsLoading(false);
			api.showSuccessToast("Type created successfully");
			navigate("/admin/types");
			return;
		}

		setIsLoading(false);
		api.showErrorToast();
	};

	return (
		<>
			<Meta title="New Types" />

			<div className="px-4 py-8 space-y-8">
				<Title title="New Types" />
				<Breadcrumb
					items={[
						{ title: "Types", link: "/admin/types", icon: <IconType size={16} /> },
						{ title: "New Type", link: "/admin/types/new" },
					]}
				/>

				<Card className="p-8">
					<TypeForm form={form} submit={submit} button={button} />
				</Card>
			</div>
		</>
	);
};

export default NewTypeAdminPage;
