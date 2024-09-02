import { api } from "@client/lib/api";
import { ChatsSelectModel } from "@db/chats";
import { TicketsSelectModel } from "@db/tickets";
import { useQuery } from "@tanstack/react-query";

export const useTicketQuery = (uuid: string | null) => {
	return useQuery({
		queryKey: ["admin", "tickets", uuid],
		queryFn: async () => {
			const req = await api.url(`/admin/tickets/${uuid}`).useAuth().get();
			return await req.json<{ ticket: TicketsSelectModel; chats: ChatsSelectModel[] }>();
		},
	});
};
