import { api } from "@client/lib/api";
import { TypesSelectModel } from "@db/types";
import { useQuery } from "@tanstack/react-query";

export const useTypeQuery = (uuid: string) => {
	return useQuery({
		queryKey: ["admin", "types", uuid],
		queryFn: async () => {
			const req = await api.url(`/admin/types/${uuid}`).useAuth().get();
			return await req.json<TypesSelectModel>();
		},
	});
};
