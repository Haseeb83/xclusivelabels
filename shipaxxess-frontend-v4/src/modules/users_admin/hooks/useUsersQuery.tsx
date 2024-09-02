import { api } from "@client/lib/api";
import { UsersSelectModel } from "@db/users";
import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = () => {
	return useQuery({
		queryKey: ["admin", "users"],
		queryFn: async () => {
			const req = await api.url("/admin/users").useAuth().get();
			return await req.json<UsersSelectModel[]>();
		},
	});
};
