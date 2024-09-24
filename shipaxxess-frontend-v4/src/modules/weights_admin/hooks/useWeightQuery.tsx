import { api } from "@client/lib/api";
import { AdminWeightsSelectModel } from "@db/adminWeights";
import { useQuery } from "@tanstack/react-query";

export const useWeightQuery = (uuid: string | null) => {
	return useQuery({
		queryKey: ["admin", "weights", uuid],
		queryFn: async () => {
			const req = await api.url(`/admin/weights/${uuid}`).useAuth().get();
			return await req.json<AdminWeightsSelectModel>();
		},
	});
};
