import { api } from "@client/lib/api";
import { StoresSelectModel } from "@db/stores";
import { useQuery } from "@tanstack/react-query";

export const useStoresQuery = () => {
	return useQuery({
		queryKey: ["stores"],
		queryFn: async () => {
			const req = await api.url("/user/stores").useAuth().get();
			return await req.json<StoresSelectModel[]>();
		},
	});
};
