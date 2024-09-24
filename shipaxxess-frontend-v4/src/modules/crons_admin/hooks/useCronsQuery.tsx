import { api } from "@client/lib/api";
import { CronsSelectModel } from "@db/crons";
import { useQuery } from "@tanstack/react-query";

export const useCronsQuery = () => {
	return useQuery({
		queryKey: ["admin", "crons"],
		queryFn: async () => {
			const req = await api.url("/admin/crons").useAuth().get();
			return await req.json<CronsSelectModel[]>();
		},
	});
};
