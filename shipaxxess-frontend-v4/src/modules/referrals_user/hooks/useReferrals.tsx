import { api } from "@client/lib/api";
import { UsersSelectModel } from "@db/users";
import { useQuery } from "@tanstack/react-query";

export const useReferralsQuery = () => {
	return useQuery({
		queryKey: ["referrals"],
		queryFn: async () => {
			const req = await api.url("/user/referrals").useAuth().get();
			return await req.json<UsersSelectModel[]>();
		},
	});
};
