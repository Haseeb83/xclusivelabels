import { api } from "@client/lib/api";
import { GatewayProps } from "@client/types/gateway";
import { useQuery } from "@tanstack/react-query";

export const useGatewayQuery = () => {
	return useQuery({
		queryKey: ["payments", "gateway"],
		queryFn: async () => {
			const req = await api.url("/user/payments/gateway").useAuth().get();
			return await req.json<GatewayProps>();
		},
	});
};
