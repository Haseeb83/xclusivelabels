import { api } from "@client/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TypesSelectModel } from "@db/types";

export const useTypesQuery = () => {
	return useQuery({
		queryKey: ["types"],
		queryFn: async () => {
			const req = await api.url("/user/types").useAuth().get();
			return await req.json<TypesSelectModel[]>();
		},
	});
};
