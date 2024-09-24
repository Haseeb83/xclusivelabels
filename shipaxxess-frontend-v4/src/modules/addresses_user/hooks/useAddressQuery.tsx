import { api } from "@client/lib/api";
import { AddressesSelectModel } from "@db/addresses";
import { useQuery } from "@tanstack/react-query";

export const useAddressQuery = (uuid: string) => {
	return useQuery({
		queryKey: ["addresses", uuid],
		queryFn: async () => {
			const req = await api.url(`/user/addresses/${uuid}`).useAuth().get();
			return await req.json<AddressesSelectModel>();
		},
	});
};
