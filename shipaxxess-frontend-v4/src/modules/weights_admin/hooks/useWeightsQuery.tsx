import { api } from "@client/lib/api";
import { AdminWeightsSelectModel } from "@db/adminWeights";
import { TypesSelectModel } from "@db/types";
import { useQuery } from "@tanstack/react-query";

export const useWeightsQuery = () => {
	return useQuery({
		queryKey: ["admin", "weights"],
		queryFn: async () => {
			const req = await api.url("/admin/weights").useAuth().get();
			return await req.json<(AdminWeightsSelectModel & { type: TypesSelectModel })[]>();
		},
	});
};
