import { api } from "@client/lib/api";
import { BatchsSelectModel } from "@db/batchs";
import { useQuery } from "@tanstack/react-query";

export const useBatchesQuery = () => {
	return useQuery({
		queryKey: ["admin", "batches"],
		queryFn: async () => {
			const req = await api.url("/admin/labels/batch").useAuth().get();
			return await req.json<BatchsSelectModel[]>();
		},
	});
};
