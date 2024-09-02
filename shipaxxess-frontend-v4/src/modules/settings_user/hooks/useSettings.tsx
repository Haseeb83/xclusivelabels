import { api } from "@client/lib/api";
import { UsersSelectModel } from "@db/users";
import { useQuery } from "@tanstack/react-query";

export const useSettingsQuery = () => {
	return useQuery({
		queryKey: ["settings"],
		queryFn: async () => {
			const req = await api.url("/user/settings").useAuth().get();
			return await req.json<UsersSelectModel>();
		},
	});
};
