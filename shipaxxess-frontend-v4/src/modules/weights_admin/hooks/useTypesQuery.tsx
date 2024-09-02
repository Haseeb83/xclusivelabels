import { api } from "@client/lib/api";
import { TypesSelectModel } from "@db/types";
import { useQuery } from "@tanstack/react-query";

export const useTypesQuery = () => {
	return useQuery({
		queryKey: ["admin", "types"],
		queryFn: async () => {
			const req = await api.url("/admin/types").useAuth().get();
			return await req.json<TypesSelectModel[]>();
		},
	});
};
