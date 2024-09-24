import { api } from "@client/lib/api";
import { UsersSelectModel } from "@db/users";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (uuid: string | null) => {
	return useQuery({
		queryKey: ["admin", "users", uuid],
		queryFn: async () => {
			const req = await api.url(`/admin/users/${uuid}`).useAuth().get();
			return await req.json<UsersSelectModel>();
		},
	});
};
