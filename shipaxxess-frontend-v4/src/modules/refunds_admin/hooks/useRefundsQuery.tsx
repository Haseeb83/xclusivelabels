import { api } from "@client/lib/api";
import { RefundsSelectModel } from "@db/refunds";
import { useQuery } from "@tanstack/react-query";

export const useRefundsQuery = () => {
	return useQuery({
		queryKey: ["admin", "refunds"],
		queryFn: async () => {
			const req = await api.url("/admin/refunds").useAuth().get();
			return await req.json<RefundsSelectModel[]>();
		},
	});
};
