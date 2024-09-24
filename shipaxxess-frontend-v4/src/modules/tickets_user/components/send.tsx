import { Form, FormControl, FormField, FormItem, FormMessage } from "@client/components/ui/form";
import { Textarea } from "@client/components/ui/textarea";
import { useLoading } from "@client/hooks/useLoading";
import { api } from "@client/lib/api";
import { ChatsSelectModel } from "@db/chats";
import { TicketsSelectModel } from "@db/tickets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chats } from "@shipaxxess/shipaxxess-zod-v4";
import { useForm } from "react-hook-form";

type SendChatFormProps = {
	chats: ChatsSelectModel[];
	ticket?: TicketsSelectModel;
	setChat: React.Dispatch<React.SetStateAction<ChatsSelectModel[]>>;
};

const SendChatForm = ({ chats, ticket, setChat }: SendChatFormProps) => {
	const { button, setIsLoading } = useLoading({
		label: "Send",
	});
	const form = useForm<Chats.ZODSCHEMA>({ defaultValues: { message: "" }, resolver: zodResolver(Chats.ZODSCHEMA) });

	const submit = async (values: Chats.ZODSCHEMA) => {
		setIsLoading(true);

		if (!ticket) return;

		const req = await api.url(`/user/tickets/${ticket.uuid}`).useAuth().post(values);
		const res = await req.json<ChatsSelectModel>();

		if (res.id) {
			setChat([...chats, res]);
			setIsLoading(false);
			form.reset();
			return;
		}

		api.showErrorToast();
		setIsLoading(false);
	};

	if (ticket && ticket.status === "closed") return <></>;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-3">
				<FormField
					control={form.control}
					name="message"
					render={({ field }:any) => (
						<FormItem>
							<FormControl>
								<Textarea placeholder="Write your message here" className="resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{button}
			</form>
		</Form>
	);
};

export default SendChatForm;
