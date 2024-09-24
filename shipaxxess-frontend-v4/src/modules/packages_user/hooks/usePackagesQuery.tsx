import { api } from "@client/lib/api";
import { PackagesSelectModel } from "@db/packages";
import { useQuery } from "@tanstack/react-query";

export const usePackagesQuery = () => {
	return useQuery({
		queryKey: ["packages"],
		queryFn: async () => {
			const req = await api.url("/user/packages").useAuth().get();
			return await req.json<PackagesSelectModel[]>();
		},
	});
};
