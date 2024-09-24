import { api } from "@client/lib/api";
import { PaymentsSelectModel } from "@db/payments";
import { useQuery } from "@tanstack/react-query";

export const usePaymentsQuery = () => {
	return useQuery({
		queryKey: ["payments"],
		queryFn: async () => {
			const req = await api.url("/user/payments").useAuth().get();
			return await req.json<PaymentsSelectModel[]>();
		},
	});
};
