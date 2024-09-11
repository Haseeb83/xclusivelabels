import Breadcrumb from "@client/components/common/breadcrumb";
import Meta from "@client/components/common/meta";
import Title from "@client/components/common/title";
import { Card } from "@client/components/ui/card";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tickets } from "@shipaxxess/shipaxxess-zod-v4/tickets";
import { Ticket } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/form";
import useQuery from "@client/hooks/useQuery";

const NewTicketUserPage = () => {
	const navigate = useNavigate();

	const query = useQuery();

	const { button, setIsLoading } = useLoading({
		label: "Submit Ticket",
	});

	const form = useForm<Tickets.ZODSCHEMA>({
		resolver: zodResolver(Tickets.ZODSCHEMA),
		defaultValues: {
			content: "",
			title: "",
			type: query.get("type") ? query.get("type")! : "other",
			data_id: query.get("id") ? query.get("id")! : undefined,
		},
	});

	const submit = async (values: Tickets.ZODSCHEMA) => {
		setIsLoading(true);

		const req = await api.url("/user/tickets").post(values);
		const res = await req.json<{ success: boolean }>();

		if (res.success) {
			api.showSuccessToast();
			navigate("/tickets");
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	return (
		<>
			<Meta title="New Ticket" />

			<div className="px-4 py-8 space-y-8">
				<Title title="New Ticket" />
				<Breadcrumb
					items={[
						{ title: "Tickets", link: "/tickets", icon: <Ticket size={16} /> },
						{ title: "New Ticket", link: "/tickets/new" },
					]}
				/>
				<Card className="p-8">
					<TicketForm button={button} form={form} submit={submit} />
				</Card>
			</div>
		</>
	);
};

export default NewTicketUserPage;
