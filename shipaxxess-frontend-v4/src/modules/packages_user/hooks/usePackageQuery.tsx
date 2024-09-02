import { api } from "@client/lib/api";
import { PackagesSelectModel } from "@db/packages";
import { useQuery } from "@tanstack/react-query";

export const usePackageQuery = (uuid: string | null) => {
	return useQuery({
		queryKey: ["packages", uuid],
		queryFn: async () => {
			const req = await api.url(`/user/packages/${uuid}`).useAuth().get();
			return await req.json<PackagesSelectModel>();
		},
	});
};
