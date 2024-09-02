import { api } from "@client/lib/api";
import { AdminSettingsSelectModel } from "@db/adminSettings";
import { useQuery } from "@tanstack/react-query";

export const useSettingsQuery = () => {
	return useQuery({
		queryKey: ["admin", "settings"],
		queryFn: async () => {
			const req = await api.url("/admin/settings").useAuth().get();
			return await req.json<AdminSettingsSelectModel[]>();
		},
	});
};
