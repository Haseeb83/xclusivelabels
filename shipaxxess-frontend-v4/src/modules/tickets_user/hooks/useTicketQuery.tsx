import { api } from "@client/lib/api";
import { TicketsSelectModel } from "@db/tickets";
import { useQuery } from "@tanstack/react-query";
import { ChatsSelectModel } from "@db/chats";

export const useTicketQuery = (uuid: string | null) => {
	return useQuery({
		queryKey: ["tickets", uuid],
		queryFn: async () => {
			const req = await api.url(`/user/tickets/${uuid}`).useAuth().get();
			return await req.json<{ chats: ChatsSelectModel[]; ticket: TicketsSelectModel }>();
		},
	});
};
