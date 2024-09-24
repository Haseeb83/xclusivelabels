import { useUserQuery } from "../hooks/useUserQuery";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import Breadcrumb from "@client/components/common/breadcrumb";
import { User } from "lucide-react";
import Loading from "@client/components/common/loading";
import { Card } from "@client/components/ui/card";
import FormComponent from "../components/form";
import { useParams } from "react-router-dom";

const ViewUserAdminPage = () => {
	const params = useParams();

	const userQuery = useUserQuery(params.uuid!);

	if (userQuery.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Meta title={userQuery.data?.first_name || "Profile"} />

			<div className="px-4 py-8 space-y-8">
				<Title title="User" />
				<Breadcrumb
					items={[
						{ title: "Users", link: "/admin/users", icon: <User size={16} /> },
						{ title: userQuery.data?.first_name || "" },
					]}
				/>

				<Card className="p-8">
					<FormComponent query={userQuery} />
				</Card>
			</div>
		</>
	);
};

export default ViewUserAdminPage;
