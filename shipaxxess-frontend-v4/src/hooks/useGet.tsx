import { api } from "@client/lib/api";
import { useQuery } from "@tanstack/react-query";


export const UseGet = (queryKey: (string | { start: null; end: null; })[], _identifier: string, _p0: { params: { start: null; end: null; }; }, url: string) => {
    return useQuery({
        queryKey: [queryKey],
        queryFn: async () => {
            const res = await api.url(url).useAuth().get();
            const data = await res.json() as any;
            if (data.error) {

                throw new Error(data.error);
            }


            return data;
        },
    });
}