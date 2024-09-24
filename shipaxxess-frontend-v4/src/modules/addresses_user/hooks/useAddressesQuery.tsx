import { api } from "@client/lib/api";
import { AddressesSelectModel } from "@db/addresses";
import { useQuery } from "@tanstack/react-query";

export const useAddressesQuery = () => {
	return useQuery({
		queryKey: ["addresses"],
		queryFn: async () => {
			const req = await api.url("/user/addresses").useAuth().get();
			return await req.json<AddressesSelectModel[]>();
		},
	});
};
