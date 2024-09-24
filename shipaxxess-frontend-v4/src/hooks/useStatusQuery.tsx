import { api } from "@client/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UsersSelectModel } from "@db/users";

export const useStatusQuery = (url: string) => {
	// Query
	const statusQuery = useQuery({
		retry: 0,
		queryKey: ["status"],
		queryFn: async () => {
			const req = await api.url(url).useAuth().get();
			const res = await req.json<UsersSelectModel>();

			if (!res.id) {
				throw api.showErrorToast();
			}

			return res;
		},
	});

	return statusQuery;
};
