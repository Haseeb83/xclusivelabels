import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Card } from "@client/components/ui/card";
import { Boxes } from "lucide-react";
import PackageForm from "../components/form";
import { useNavigate } from "react-router-dom";
import { useLoading } from "@client/hooks/useLoading";
import { useForm } from "react-hook-form";
import { Package } from "@shipaxxess/shipaxxess-zod-v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@client/lib/api";

const NewPackageUserPage = () => {
	const navigate = useNavigate();

	const { button, setIsLoading } = useLoading({
		label: "Save Package",
	});

	const form = useForm<Package.ZODSCHEMA>({
		resolver: zodResolver(Package.ZODSCHEMA),
		defaultValues: {
			height: undefined,
			length: undefined,
			name: "",
			weight: undefined,
			width: undefined,
			radio: "lb",
		},
	});

	const submit = async (values: Package.ZODSCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/user/packages").post(values);
		const res = await req.json<{ success: boolean }>();

		if (res.success) {
			api.showSuccessToast();
			navigate("/user/packages");
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	return (
		<>
			<Meta title="Create Saved Package" />

			<div className="px-4 py-8 space-y-8">
				<Title title="Create Saved Package" />
				<Breadcrumb
					items={[
						{ title: "Packages", link: "/user/packages", icon: <Boxes size={16} /> },
						{ title: "Create Saved Package", link: "/user/packages/new" },
					]}
				/>
				<Card className="p-8">
					<PackageForm button={button} form={form} submit={submit} />
				</Card>
			</div>
		</>
	);
};

export default NewPackageUserPage;