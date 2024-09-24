import { api } from "@client/lib/api";
import { TicketsSelectModel } from "@db/tickets";
import { useQuery } from "@tanstack/react-query";

export const useTicketsQuery = () => {
	return useQuery({
		queryKey: ["tickets"],
		queryFn: async () => {
			const req = await api.url("/user/tickets").useAuth().get();
			return await req.json<TicketsSelectModel[]>();
		},
	});
};
