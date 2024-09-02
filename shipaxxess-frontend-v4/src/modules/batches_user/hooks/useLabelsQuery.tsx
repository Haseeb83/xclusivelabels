import { api } from "@client/lib/api";
import { BatchsSelectModel } from "@db/batchs";
import { LabelsSelectModel } from "@db/labels";
import { useQuery } from "@tanstack/react-query";

export const useBatchQuery = ({ uuid }: { uuid: string | null }) => {
	return useQuery({
		queryKey: ["batches", uuid],
		queryFn: async () => {
			const req = await api.url(`/user/labels/batch/${uuid}`).useAuth().get();
			return await req.json<{ labels: LabelsSelectModel[]; batch: BatchsSelectModel }>();
		},
	});
};
